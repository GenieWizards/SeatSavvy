import z from "zod";

import { HTTP_STATUS } from "./enums";

export const ErrorCode = z.nativeEnum(HTTP_STATUS);

export const ErrorSchema = z.object({
  error: z.object({
    code: z.nativeEnum(HTTP_STATUS),
    docs: z.string(),
    message: z.string(),
    requestId: z.string(),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorSchema>;
