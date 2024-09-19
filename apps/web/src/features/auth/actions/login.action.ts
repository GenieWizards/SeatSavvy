"use server";

import cookie from "cookie";
import { cookies } from "next/headers";

export type TLoginActionResponse = {
  type: string;
  message: string;
};

export async function onLoginSubmitAction(
  _prevState: TLoginActionResponse,
  data: FormData,
): Promise<TLoginActionResponse> {
  const formData = Object.fromEntries(data);

  try {
    const resp = await fetch(`${process.env.SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!resp.ok) {
      const error = await resp.json();

      if (error?.error?.name === "ZodError") {
        return {
          type: "error",
          message: error.error.issues[0].message,
        };
      }

      return {
        type: "error",
        message: error?.error?.message,
      };
    }
    const headerCookies = resp.headers.getSetCookie();

    const parsedCookies = cookie.parse(headerCookies[0]);

    // NOTE: Add any other cookie flags (If needed)
    cookies().set("auth_session", parsedCookies.auth_session, {
      maxAge: Number(parsedCookies["Max-Age"]),
      httpOnly: true,
      sameSite: parsedCookies.SameSite as any,
      secure: Boolean(parsedCookies.secure),
    });

    return {
      type: "success",
      message: "login successful",
    };
  } catch (err) {
    return {
      type: "error",
      message:
        err instanceof Error
          ? err.message || "An unexpected error occurred"
          : "Something went wrong, please try again",
    };
  }
}
