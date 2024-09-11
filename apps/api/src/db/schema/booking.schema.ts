import { createId } from "@paralleldrive/cuid2";
import { bookingStatus } from "@seatsavvy/types";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import showSchema from "./show.schema";
import userSchema from "./user.schema";

export const bookingStatusEnum = pgEnum("status", bookingStatus);

const bookingSchema = pgTable("bookings", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  numOfSeats: integer("num_of_seats").notNull(),
  bookedAt: timestamp("booked_at", { mode: "string" }).notNull().defaultNow(),
  status: bookingStatusEnum("status").notNull(),

  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => userSchema.id),
  showId: varchar("show_id", { length: 255 })
    .notNull()
    .references(() => showSchema.id),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default bookingSchema;
