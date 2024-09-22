import type { Env, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import type { Session, User } from "lucia";

import { lucia } from "../lib/luciaAdapter.lib";

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

    return next();
  };
}

export interface IContext extends Env {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}
