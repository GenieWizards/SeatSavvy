import { createId } from "@paralleldrive/cuid2";
import { genres } from "@seatsavvy/types";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import theatreHallSchema from "./theatreHall.schema";

export const genresEnum = pgEnum("type", genres);

const eventSchema = pgTable("events", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 255 }).notNull(),
  isBookable: boolean("is_bookable").notNull().default(false),
  duration: varchar("duration", { length: 255 }).notNull(), // eg: 2h 30m
  languages: text("languages").array().notNull(),
  genres: genresEnum("genres").array().notNull(),

  theatreHallId: varchar("theatre_hall_id", { length: 255 })
    .notNull()
    .references(() => theatreHallSchema.id),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default eventSchema;
