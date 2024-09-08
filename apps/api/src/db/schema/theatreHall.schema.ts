import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  real,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import citySchema from "./city.schema";
import eventSchema from "./event.schema";
import theatreSchema from "./theatre.schema";

const theatreHallSchema = pgTable("theatre_halls", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  totalSeats: integer("total_seats").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),

  theatreId: varchar("theatre_id", { length: 255 }).references(
    () => theatreSchema.id,
  ),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const theatreRelations = relations(theatreSchema, ({ many }) => ({
  cities: many(citySchema),
  events: many(eventSchema),
}));

export default theatreHallSchema;
