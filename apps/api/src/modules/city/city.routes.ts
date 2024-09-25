import { zValidator } from "@hono/zod-validator";
import {
  AuthRole,
  CityQuerySchema,
  CreateCityBodySchema,
  HTTP_CODE,
  HTTP_STATUS,
} from "@seatsavvy/types";
import { Hono } from "hono";

import {
  authMiddleware,
  checkRoleGuard,
  type IContext,
  requireAuth,
} from "@/common/middlewares";
import { AppError } from "@/common/utils/appErr.util";

import cityRepository from "./city.repository";

export const cityRoutes = new Hono<IContext>();

/**
 * Create a new city.
 *
 * Validates the request payload, checks if the city already exists, and creates a new city.
 *
 * @route POST /api/v1/cities
 * @param {Object} c - HonoJS context object.
 * @returns JSON response with success or error message.
 */
cityRoutes.post(
  "/",
  authMiddleware(),
  requireAuth(),
  checkRoleGuard(AuthRole.ADMIN),
  zValidator("json", CreateCityBodySchema),
  async (c) => {
    const payload = c.req.valid("json");

    const cityExists = await cityRepository.findByCityAndState(
      payload.name,
      payload.state,
    );

    if (cityExists?.length) {
      throw new AppError({
        code: HTTP_STATUS.NOT_UNIQUE,
        message: "Combination of City and State already exists",
      });
    }

    const city = await cityRepository.create(payload);

    if (!city?.length) {
      throw new AppError({
        code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: "Something went wrong, please try again",
      });
    }

    return c.json(
      {
        success: true,
        message: "City created successfully",
        data: city[0],
      },
      HTTP_CODE.CREATED,
    );
  },
);

/**
 * Get cities.
 *
 * @route GET /api/v1/cities
 * @param {Object} c - HonoJS context object.
 * @returns JSON response with success or error message.
 */
cityRoutes.get("/", zValidator("query", CityQuerySchema), async (c) => {
  const queryParams = c.req.valid("query");

  const cities = await cityRepository.findAll(queryParams);

  return c.json(
    {
      success: true,
      message: "Cities fetched successfully",
      data: cities,
    },
    HTTP_CODE.OK,
  );
});
