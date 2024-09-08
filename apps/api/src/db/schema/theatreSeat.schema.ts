import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import citySchema from "./city.schema";
import theatreSchema from "./theatre.schema";
import theatreHallSchema from "./theatreHall.schema";

const theatreSeatSchema = pgTable("theatre_seats", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  seatNumber: varchar("seat_number", { length: 255 }).notNull(),
  seatType: varchar("seat_type", { length: 255 }).notNull(),

  theatreHallId: varchar("theatre_hall_id", { length: 255 }).references(
    () => theatreHallSchema.id,
  ),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const theatreRelations = relations(theatreSchema, ({ many }) => ({
  cities: many(citySchema),
}));

export default theatreSeatSchema;
