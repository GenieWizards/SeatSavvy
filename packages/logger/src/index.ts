import pino from "pino";

import { REDACTED_FIELDS } from "./utils/constants";
import env from "./env";

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: "logs/combined.log", mkdir: true },
    },
    {
      level: "error",
      target: "pino/file",
      options: { destination: "logs/error.log", mkdir: true },
    },
    {
      target: "pino-pretty",
      // options: {
      //   colorize: true,
      // },
    },
  ],
});

export const logger = pino(
  {
    name: "seatsavvy",
    level: env.LOG_LEVEL || "debug",
    formatters: {
      bindings: () => {
        return {
          node_version: process.version,
          service: "Auth Hono",
        };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: REDACTED_FIELDS,
      censor: "[PINO REDACTED]",
    },
  },
  transport
);

// Error handling
process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught Exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled Rejection");
});
