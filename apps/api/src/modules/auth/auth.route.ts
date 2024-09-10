import { zValidator } from "@hono/zod-validator";
import { CreateUserBodySchema, HTTP_CODE, HTTP_STATUS } from "@seatsavvy/types";
import { hash } from "bcrypt";
import { Hono } from "hono";

import { AppError } from "@/common/utils/appErr.util";

import authRepository from "./auth.repository";

export const authRoutes = new Hono();

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

    if (payload?.password) {
      payload.password = await hash(payload.password, 10);
    }

    const user = await authRepository.create(payload);

    if (!user?.length) {
      throw new AppError({
        code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: "Something went wrong, please try again",
      });
    }

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
