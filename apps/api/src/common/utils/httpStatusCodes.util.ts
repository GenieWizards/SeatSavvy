import type { StatusCode } from "hono/utils/http-status";
import type { z } from "zod";

import type { ErrorCode } from "@seatsavvy/types";
import { HTTP_STATUS } from "@seatsavvy/types";

export function codeToStatus(code: z.infer<typeof ErrorCode>): StatusCode {
  switch (code) {
    case HTTP_STATUS.BAD_REQUEST:
      return 400;
    case HTTP_STATUS.FORBIDDEN:
    case HTTP_STATUS.DISABLED:
    case HTTP_STATUS.UNAUTHORIZED:
    case HTTP_STATUS.INSUFFICIENT_PERMISSIONS:
    case HTTP_STATUS.USAGE_EXCEEDED:
    case HTTP_STATUS.EXPIRED:
      return 403;
    case HTTP_STATUS.NOT_FOUND:
      return 404;
    case HTTP_STATUS.METHOD_NOT_ALLOWED:
      return 405;
    case HTTP_STATUS.NOT_UNIQUE:
      return 409;
    case HTTP_STATUS.DELETE_PROTECTED:
    case HTTP_STATUS.PRECONDITION_FAILED:
      return 412;
    case HTTP_STATUS.RATE_LIMITED:
      return 429;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return 500;
  }
}

export function statusToCode(status: StatusCode): z.infer<typeof ErrorCode> {
  switch (status) {
    case 400:
      return HTTP_STATUS.BAD_REQUEST;
    case 401:
      return HTTP_STATUS.UNAUTHORIZED;
    case 403:
      return HTTP_STATUS.FORBIDDEN;
    case 404:
      return HTTP_STATUS.NOT_FOUND;
    case 405:
      return HTTP_STATUS.METHOD_NOT_ALLOWED;
    case 500:
      return HTTP_STATUS.INTERNAL_SERVER_ERROR;
    default:
      return HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}
