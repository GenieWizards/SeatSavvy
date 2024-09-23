import { type AuthRole, HTTP_STATUS } from "@seatsavvy/types";
import type { Env, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import type { Session, User } from "lucia";

import { lucia } from "../lib/luciaAdapter.lib";
import { AppError } from "../utils/appErr.util";

export function authMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;

    if (!sessionId) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
      // use `header()` instead of `setCookie()` to avoid TS errors
      c.header(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize(),
        {
          append: true,
        },
      );
    }

    if (!session) {
      c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
        append: true,
      });
    }

    c.set("user", user);
    c.set("session", session);

    return await next();
  };
}

export function requireAuth(): MiddlewareHandler {
  return async (c, next) => {
    const user = c.get("user");

    if (!user) {
      throw new AppError({
        code: HTTP_STATUS.UNAUTHORIZED,
        message: "You are not authorized, please login",
      });
    }

    return await next();
  };
}

export function checkRoleGuard(...allowedRoles: AuthRole[]): MiddlewareHandler {
  return async (c, next) => {
    const user = c.get("user");

    if (!user) {
      throw new AppError({
        code: HTTP_STATUS.UNAUTHORIZED,
        message: "You are not authorized, please login",
      });
    }

    if (!user.role) {
      throw new AppError({
        code: HTTP_STATUS.FORBIDDEN,
        message: "You are not allowed to perform this action",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AppError({
        code: HTTP_STATUS.FORBIDDEN,
        message: "You are not allowed to perform this action",
      });
    }

    await next();
  };
}

export interface IContext extends Env {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}
