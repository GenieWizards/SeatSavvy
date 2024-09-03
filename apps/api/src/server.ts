import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger as honoLogger } from "hono/logger";

import { logger } from "@seatsavvy/logger";
import { HTTP_CODE, HTTP_STATUS } from "@seatsavvy/types";

import { handleError } from "./common/handlers/errors.handler";
import { AppError } from "./common/utils/appErr.util";
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
  throw new AppError({
    code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: "This is a test error",
  });
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

const PORT = env.PORT;
logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);

serve({
  fetch: app.fetch,
  port: PORT,
});
