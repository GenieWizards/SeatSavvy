import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

import theatreSchema from "./theatre.schema";

const citySchema = sqliteTable(
  "cities",
  {
    id: text("id")
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    name: text("name").notNull(),
    state: text("state").notNull().unique(),

    createdAt: text("created_at")
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at"),
  },
  (table) => ({
    unq: unique().on(table.name, table.state),
  }),
);

export const cityRelations = relations(citySchema, ({ many }) => ({
  theatres: many(theatreSchema),
}));

export default citySchema;
