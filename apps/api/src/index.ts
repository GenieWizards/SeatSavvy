import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { logger } from "@seatsavvy/logger";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const PORT = Number.parseInt(process.env.PORT || "5500", 10);
logger.info(`Server running on port ${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
