import type { ErrorCode } from "@seatsavvy/types";
import { HTTPException } from "hono/http-exception";
import type { z } from "zod";

import { codeToStatus } from "./httpStatusCodes.util";

export class AppError extends HTTPException {
  public readonly code: z.infer<typeof ErrorCode>;

  constructor({
    code,
    message,
  }: {
    code: z.infer<typeof ErrorCode>;
    message: string;
  }) {
    super(codeToStatus(code), { message });
    this.code = code;
  }
}
