import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import type { AuthRole } from "@seatsavvy/types";
import { Lucia, TimeSpan } from "lucia";

import { db } from "@/db";
import { sessionSchema, userSchema } from "@/db/schema";
import { env } from "@/env";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionSchema, userSchema);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"), // 2 weeks expiry (Can be moved to env)
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      username: attributes.username,
      role: attributes.role,
    };
  },
});

declare module "lucia" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      id: number;
      email: string;
      username: string;
      role: AuthRole;
    };
  }
}
