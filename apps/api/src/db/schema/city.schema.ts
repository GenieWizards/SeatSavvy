import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, timestamp, unique, varchar } from "drizzle-orm/pg-core";

import theatreSchema from "./theatre.schema";

const citySchema = pgTable(
  "city",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    state: varchar("state", { length: 255 }).notNull().unique(),

    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    unq: unique().on(table.name, table.state),
  }),
);

export const cityRelations = relations(citySchema, ({ many }) => ({
  theatres: many(theatreSchema),
}));

export default citySchema;
