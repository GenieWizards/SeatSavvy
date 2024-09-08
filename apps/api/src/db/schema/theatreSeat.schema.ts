import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import theatreHallSchema from "./theatreHall.schema";

const theatreSeatSchema = sqliteTable("cities", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  totalSeats: int("total_seats").notNull(),
  seatType: text("seat_type").notNull().unique(),

  theatreHallId: text("theatre_hall_id").references(() => theatreHallSchema.id),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export default theatreSeatSchema;
