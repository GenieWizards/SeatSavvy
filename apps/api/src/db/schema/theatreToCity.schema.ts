import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import citySchema from "./city.schema";
import theatreSchema from "./theatre.schema";

const theatreToCitySchema = sqliteTable("user_to_role", {
  theatreId: text("theatre_id")
    .notNull()
    .references(() => theatreSchema.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  cityId: text("city_id")
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
