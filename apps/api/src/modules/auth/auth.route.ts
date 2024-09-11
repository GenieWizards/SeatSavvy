import { zValidator } from "@hono/zod-validator";
import {
  CreateUserBodySchema,
  HTTP_CODE,
  HTTP_STATUS,
  LoginUserBodySchema,
} from "@seatsavvy/types";
import { compare, hash } from "bcrypt";
import { Hono } from "hono";

import { lucia } from "@/common/lib/luciaAdapter.lib";
import type { Context } from "@/common/middlewares";
import { AppError } from "@/common/utils/appErr.util";
import type { TSelectUserSchema } from "@/db/schema/user.schema";

import authRepository from "./auth.repository";

export const authRoutes = new Hono<Context>();

/**
 * Registers a new user.
 *
 * Validates the request payload, checks if the user already exists, and creates a new user.
 *
 * @route POST /api/v1/auth/register
 * @param {Object} c - HonoJS context object.
 * @returns JSON response with success or error message.
 */
authRoutes.post(
  "/register",
  zValidator("json", CreateUserBodySchema),
  async (c) => {
    const payload = c.req.valid("json");

    const userExists = await authRepository.findByUsernameOrEmail(payload);

    if (userExists?.length) {
      throw new AppError({
        code: HTTP_STATUS.NOT_UNIQUE,
        message: "User with the given username/email already exists",
      });
    }

    payload.password = await hash(payload.password, 10);

    const user = await authRepository.create(payload);

    if (!user?.length) {
      throw new AppError({
        code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: "Something went wrong, please try again",
      });
    }

    const session = await lucia.createSession(user[0].id, {});
    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    /**
     * This is done to remove the password in the response and will not affect anything in DB
     */
    user[0].password = null;

    return c.json(
      {
        success: true,
        message: "User created successfully",
        data: user[0],
      },
      HTTP_CODE.CREATED,
    );
  },
);

/**
 * Login user.
 *
 * Validates the request payload, sets session token in cookie and returns the user data.
 *
 * @route POST /api/v1/auth/login
 * @param {Object} c - HonoJS context object.
 * @returns JSON response with success or error message.
 */
authRoutes.post(
  "/login",
  zValidator("json", LoginUserBodySchema),
  async (c) => {
    const userSession = c.get("user");

    let userExists: TSelectUserSchema[];
    const payload = c.req.valid("json");

    if (userSession) {
      userExists = await authRepository.findByUsernameOrEmail(payload);

      return c.json(
        {
          success: true,
          message: "Already logged in",
          data: {
            id: userExists[0].id,
            username: userExists[0].username,
            email: userExists[0].email,
            fullName: userExists[0].fullName,
          },
        },
        HTTP_CODE.OK,
      );
    }

    userExists = await authRepository.findByUsernameOrEmail(payload);

    if (!userExists?.length) {
      throw new AppError({
        code: HTTP_STATUS.UNAUTHORIZED,
        message: "Invalid credentials or user does not exist",
      });
    }

    const passwordMatch = await compare(
      payload.password,
      userExists[0].password || "",
    );

    if (!passwordMatch) {
      throw new AppError({
        code: HTTP_STATUS.UNAUTHORIZED,
        message: "Invalid credentials or user does not exist",
      });
    }

    const session = await lucia.createSession(userExists[0].id, {});

    c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
      append: true,
    });

    return c.json(
      {
        success: true,
        message: "User logged in successfully",
        data: {
          id: userExists[0].id,
          username: userExists[0].username,
          email: userExists[0].email,
          fullName: userExists[0].fullName,
        },
      },
      HTTP_CODE.OK,
    );
  },
);

/**
 * Logout user.
 *
 * Removes the session token from the cookie.
 *
 * @route POST /api/v1/auth/logout
 * @param {Object} c - HonoJS context object.
 * @returns NA
 */
authRoutes.post("/logout", async (c) => {
  const session = c.get("session");

  if (!session) {
    return c.body(null, HTTP_CODE.UNAUTHORIZED);
  }

  await lucia.invalidateSession(session.id);

  c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
    append: true,
  });

  return c.body(null, HTTP_CODE.NO_CONTENT);
});
