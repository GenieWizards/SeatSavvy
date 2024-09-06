import { logger } from "@seatsavvy/logger";
import { type ErrorSchema, HTTP_CODE, HTTP_STATUS } from "@seatsavvy/types";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { type z, ZodError } from "zod";

import { AppError } from "../utils/appErr.util";
import { statusToCode } from "../utils/httpStatusCodes.util";

export function handleError(err: Error, c: Context): Response {
  /**
   * Zod errors are 400 as they are client errors mostly
   */
  if (err instanceof ZodError) {
    logger.error(
      {
        message: err.message,
        name: err.name,
        code: HTTP_STATUS.BAD_REQUEST,
        status: HTTP_CODE.BAD_REQUEST,
      },
      "returning 400 Zod error",
    );

    return c.json<z.infer<typeof ErrorSchema>>(
      {
        error: {
          code: HTTP_STATUS.BAD_REQUEST,
          docs: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${HTTP_CODE.BAD_REQUEST}`,
          message: err.message,
          requestId: c.get("requestId"),
        },
      },
      { status: HTTP_CODE.BAD_REQUEST },
    );
  }

  /**
   * We can handle this very well, as it is something we threw ourselves
   */
  if (err instanceof AppError) {
    if (err.status >= 500) {
      logger.error(
        {
          message: err.message,
          name: err.name,
          code: err.code,
          status: err.status,
          cause: err.cause,
        },
        "returning 5XX",
      );
    }
    return c.json<z.infer<typeof ErrorSchema>>(
      {
        error: {
          code: err.code,
          docs: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${err.code}`,
          message: err.message,
          requestId: c.get("requestId"),
        },
      },
      { status: err.status },
    );
  }

  /**
   * HTTPExceptions from hono at least give us some idea of what to do as they provide a status and
   * message
   */
  if (err instanceof HTTPException) {
    if (err.status >= 500) {
      logger.error(
        {
          message: err.message,
          status: err.status,
          requestId: c.get("requestId"),
        },
        "HTTPException",
      );
    }
    const code = statusToCode(err.status);
    return c.json<z.infer<typeof ErrorSchema>>(
      {
        error: {
          code,
          docs: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${code}`,
          message: err.message,
          requestId: c.get("requestId"),
        },
      },
      { status: err.status },
    );
  }

  /**
   * We're lost here, all we can do is return a 500 and log it to investigate
   */
  logger.error(
    {
      name: err.name,
      message: err.message,
      cause: err.cause,
      stack: err.stack,
      requestId: c.get("requestId"),
    },
    "unhandled exception",
  );
  return c.json<z.infer<typeof ErrorSchema>>(
    {
      error: {
        code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
        message: err.message ?? "something unexpected happened",
        requestId: c.get("requestId"),
      },
    },
    { status: HTTP_CODE.INTERNAL_SERVER_ERROR },
  );
}
