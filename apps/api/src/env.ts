import { logger } from "@seatsavvy/logger";
import { z, ZodError } from "zod";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.string().default("debug"),
  PORT: z.coerce.number().default(5500),
  DB_URL: z.string().default("postgres://root:root@localhost:5432/seatsavvy"),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
  CLIENT_URL: z.string().url(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += issue.path[0] + "\n";
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    logger.error(error);
  }
}

export const env = EnvSchema.parse(process.env);
