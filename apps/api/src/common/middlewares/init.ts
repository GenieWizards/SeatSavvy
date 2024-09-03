import { randomUUID } from "crypto";
import type { MiddlewareHandler } from "hono";

/**
 * Initialize services.
 *
 * Call this once before any hono handlers run.
 */
export function init(): MiddlewareHandler {
  return async (c, next) => {
    const requestId = c.req.header("X-Request-Id") || randomUUID();

    c.set("requestId", requestId);

    c.res.headers.set("X-Request-Id", requestId);

    await next();
  };
}
