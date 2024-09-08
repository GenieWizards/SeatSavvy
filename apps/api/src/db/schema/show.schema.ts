import { createId } from "@paralleldrive/cuid2";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import eventSchema from "./event.schema";

const showSchema = pgTable("shows", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),

  startDate: timestamp("start_date", { mode: "string" }).notNull(),
  endDate: timestamp("end_date", { mode: "string" }).notNull(),

  eventid: varchar("event_id", { length: 255 }).references(
    () => eventSchema.id,
  ),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default showSchema;
