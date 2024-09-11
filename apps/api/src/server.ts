import "dotenv/config";

import { serve } from "@hono/node-server";
import { logger } from "@seatsavvy/logger";
import { HTTP_CODE } from "@seatsavvy/types";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger as honoLogger } from "hono/logger";

import { handleError } from "./common/handlers/errors.handler";
import type { Context } from "./common/middlewares";
import { authMiddleware, cors, csrf, init } from "./common/middlewares";
import { env } from "./env";
import { authRoutes } from "./modules/auth/auth.route";

const app = new Hono<Context>();

// Built-In middlewares
app.use(honoLogger());
app.use(csrf());
app.use("*", cors());

// Custom middlewares
app.use("*", init());
app.use("*", authMiddleware());

// Global Error handler
app.onError(handleError);

app.get("/ping", (c) => {
  return c.json(
    {
      ping: "pong",
      env: env.NODE_ENV,
    },
    HTTP_CODE.OK,
  );
});

app.route("/api/v1/auth", authRoutes);

// global routes
app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: `Route not found ${c.req.path}`,
    },
    HTTP_CODE.NOT_FOUND,
  );
});

if (env.NODE_ENV === "development")
  showRoutes(app, { verbose: true, colorize: true });

logger.info(
  `Server running on port ${env.PORT} in ${process.env.NODE_ENV} mode`,
);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
