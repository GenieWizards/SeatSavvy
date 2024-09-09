import { createId } from "@paralleldrive/cuid2";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const userSchema = pgTable("users", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }),
  password: varchar("password", { length: 255 }),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default userSchema;
