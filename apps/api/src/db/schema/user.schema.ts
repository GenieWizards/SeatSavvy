import { createId } from "@paralleldrive/cuid2";
import type { SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgTable, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

const userSchema = pgTable(
  "users",
  {
    id: varchar("id", { length: 255 })
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

// custom lower function
export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
