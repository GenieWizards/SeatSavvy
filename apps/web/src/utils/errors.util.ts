import type { ZodError } from "zod";

import type { IError } from "@/types/error.types";

export function formatZodErrors(error: { error: ZodError }) {
  const messages = error?.error?.issues?.map((issue) => issue.message);

  return formatErrorResponse({
    messages: messages,
    name: error?.error?.name,
    success: false,
  });
}

export function formatErrorResponse(error: IError) {
  const errorObj: IError = {
    messages: [],
    success: false,
  };

  if (error?.name) {
    errorObj.name = error.name;
  }

  if (error?.messages?.length) {
    errorObj.messages = Array.isArray(error.messages)
      ? error.messages
      : [error.messages];
  }

  if (error?.error) {
    errorObj.error = error.error;
  }

  return errorObj;
}
