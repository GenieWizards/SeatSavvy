import { createId } from "@paralleldrive/cuid2";
import type { SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

const userSchema = pgTable(
  "users",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    fullName: varchar("full_name", { length: 255 }),
    password: varchar("password", { length: 255 }),

    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(lower(table.email)),
  }),
);

export default userSchema;

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(userSchema);

export type TSelectUserSchema = z.infer<typeof selectUserSchema>;

// custom lower function
export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
