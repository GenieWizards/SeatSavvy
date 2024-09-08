import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import eventSchema from "./event.schema";
import theatreSchema from "./theatre.schema";

const eventToTheatreHallSchema = pgTable("event_to_theatre_hall", {
  theatreHallId: varchar("theatre_id", { length: 255 })
    .notNull()
    .references(() => theatreSchema.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  eventId: varchar("event_d", { length: 255 })
    .notNull()
    .references(() => eventSchema.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const eventToTheatreHallRelations = relations(
  eventToTheatreHallSchema,
  ({ one }) => ({
    theatres: one(theatreSchema, {
      fields: [eventToTheatreHallSchema.theatreHallId],
      references: [theatreSchema.id],
    }),
    events: one(eventSchema, {
      fields: [eventToTheatreHallSchema.eventId],
      references: [eventSchema.id],
    }),
  }),
);

export default eventToTheatreHallSchema;
