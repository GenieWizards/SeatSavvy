import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger as honoLogger } from "hono/logger";

import { logger } from "@seatsavvy/logger";

import { handleError } from "./common/handlers/errors.handler";
import env from "./env";

const app = new Hono();

app.use(honoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// global routes
app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: `Route not found ${c.req.path}`,
    },
    404,
  );
});

app.onError((err, c) => {
  logger.error(err);
  return handleError(err, c);
});

const PORT = env.PORT;
logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);

serve({
  fetch: app.fetch,
  port: PORT,
});
