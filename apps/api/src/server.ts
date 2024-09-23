import { serve } from "@hono/node-server";
import { logger } from "@seatsavvy/logger";
import { HTTP_CODE } from "@seatsavvy/types";
import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger as honoLogger } from "hono/logger";

import { handleError } from "./common/handlers/errors.handler";
import type { IContext } from "./common/middlewares";
import { authMiddleware, cors, csrf, init } from "./common/middlewares";
import { connection } from "./db";
import { env } from "./env";
import { authRoutes } from "./modules/auth/auth.routes";
import { cityRoutes } from "./modules/city/city.routes";

const app = new Hono<IContext>();

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
app.route("/api/v1/cities", cityRoutes);

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

const server = serve({
  fetch: app.fetch,
  port: env.PORT,
});

// Graceful shutdown
async function gracefulShutdown() {
  logger.info("Shutting down gracefully");

  // Close the HTTP server
  server.close(() => {
    logger.info("HTTP Server closed");
  });

  try {
    await connection.end();
    logger.info("Database connection closed");
  } catch (err) {
    logger.error(err, "Error closing database connection");
  }

  process.exit(0);
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);

export { server };
