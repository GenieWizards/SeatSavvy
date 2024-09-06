import { logger } from "@seatsavvy/logger";
import { z, ZodError } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.string().default("debug"),
  PORT: z.number().default(5500),
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

export default EnvSchema.parse(process.env);
