import pino from "pino";

import env from "./env";
import { REDACTED_FIELDS } from "./utils/constants";

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
      target: "pino-pretty", // To log prettiely
      // options: {
      //   colorize: true,
      // },
    },
    // {
    //   target: "pino/file", // To log in JSON in console
    // },
  ],
});

export const logger = pino(
  {
    name: "seatsavvy",
    level: env.LOG_LEVEL || "debug",
    formatters: {
      bindings: (bindings) => {
        return {
          node_version: process.version,
          service: "SeatSavvy",
          pid: bindings.pid,
          // host: bindings.hostname,
        };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: REDACTED_FIELDS,
      censor: "[PINO REDACTED]",
    },
  },
  transport,
);

// Error handling
process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught Exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled Rejection");
});
