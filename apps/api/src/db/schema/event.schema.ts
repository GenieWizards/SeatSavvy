import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { customType, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const customBoolean = customType<{ data: boolean }>({
  dataType() {
    return "boolean";
  },
});

const eventSchema = sqliteTable("cities", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: int("name").notNull().unique(),
  description: text("description").notNull(),
  isBookable: customBoolean("is_bookable").notNull().default(false),
  duration: text("duration").notNull(),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export default eventSchema;
