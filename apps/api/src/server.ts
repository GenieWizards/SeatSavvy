import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger as honoLogger } from "hono/logger";
import { showRoutes } from "hono/dev";

import { logger } from "@seatsavvy/logger";
import { HTTP_CODE } from "@seatsavvy/types";

import { handleError } from "./common/handlers/errors.handler";
import { init, cors } from "./common/middlewares";
import env from "./env";

const app = new Hono();

// Built-In middlewares
app.use(honoLogger());
app.use("*", cors());

// Custom middlewares
app.use("*", init());

// Global Error handler
app.onError(handleError);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.json(
    {
      ping: "pong",
      env: env.NODE_ENV,
    },
    HTTP_CODE.OK,
  );
});

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
