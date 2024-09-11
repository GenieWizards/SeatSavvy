import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import userSchema from "./user.schema";

const sessionSchema = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => userSchema.id),
  expiresAt: timestamp("expires_at", {
    mode: "date",
  }).notNull(),
});

export default sessionSchema;
