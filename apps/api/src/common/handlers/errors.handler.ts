import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { z } from "zod";

import { logger } from "@seatsavvy/logger";
import { HTTP_STATUS, type ErrorSchema } from "@seatsavvy/types";

import { statusToCode } from "../utils/httpStatusCodes.util";
import { AppError } from "../utils/appErr.util";

export function handleError(err: Error, c: Context): Response {
  /**
   * We can handle this very well, as it is something we threw ourselves
   */
  if (err instanceof AppError) {
    if (err.status >= 500) {
      logger.error("returning 5XX", {
        message: err.message,
        name: err.name,
        code: err.code,
        status: err.status,
      });
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
      logger.error("HTTPException", {
        message: err.message,
        status: err.status,
        requestId: c.get("requestId"),
      });
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
  logger.error("unhandled exception", {
    name: err.name,
    message: err.message,
    cause: err.cause,
    stack: err.stack,
    requestId: c.get("requestId"),
  });
  return c.json<z.infer<typeof ErrorSchema>>(
    {
      error: {
        code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
        message: err.message ?? "something unexpected happened",
        requestId: c.get("requestId"),
      },
    },
    { status: 500 },
  );
}
