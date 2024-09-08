import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const userSchema = sqliteTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  fullName: text("full_name"),
  password: text("password").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export default userSchema;
