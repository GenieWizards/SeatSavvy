import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import citySchema from "./city.schema";
import theatreSchema from "./theatre.schema";

const theatreToCitySchema = pgTable("theatre_to_city", {
  theatreId: varchar("theatre_id", { length: 255 })
    .notNull()
    .references(() => theatreSchema.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  cityId: varchar("city_id", { length: 255 })
    .notNull()
    .references(() => citySchema.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const theatreToCityRelations = relations(
  theatreToCitySchema,
  ({ one }) => ({
    theatres: one(theatreSchema, {
      fields: [theatreToCitySchema.theatreId],
      references: [theatreSchema.id],
    }),
    citite: one(citySchema, {
      fields: [theatreToCitySchema.cityId],
      references: [citySchema.id],
    }),
  }),
);

export default theatreToCitySchema;
