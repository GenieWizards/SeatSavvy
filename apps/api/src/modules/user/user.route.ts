import { zValidator } from "@hono/zod-validator";
import { CreateUserBodySchema, HTTP_CODE, HTTP_STATUS } from "@seatsavvy/types";
import { Hono } from "hono";

import { AppError } from "@/common/utils/appErr.util";

import userRepository from "./user.repository";

export const userRoutes = new Hono();

userRoutes.post("/", zValidator("json", CreateUserBodySchema), async (c) => {
  const payload = c.req.valid("json");

  const userExists = await userRepository.findByUsernameOrEmail(payload);

  if (userExists?.length) {
    throw new AppError({
      code: HTTP_STATUS.NOT_UNIQUE,
      message: "User with the given username/email already exists",
    });
  }

  // TODO: Hash password before saving to DB
  const user = await userRepository.create(payload);

  if (!user) {
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
      data: user,
    },
    HTTP_CODE.OK,
  );
});
