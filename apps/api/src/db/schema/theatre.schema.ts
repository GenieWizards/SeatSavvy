import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import citySchema from "./city.schema";

const theatreSchema = pgTable("theatres", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  totalTheatreHalls: integer("total_theatre_halls").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const theatreRelations = relations(theatreSchema, ({ many }) => ({
  cities: many(citySchema),
}));

export default theatreSchema;
