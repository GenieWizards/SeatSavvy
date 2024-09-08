import { createId } from "@paralleldrive/cuid2";
import { showSeatStatus } from "@seatsavvy/types";
import { pgEnum, pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

import theatreSeatSchema from "./theatreSeat.schema";

export const seatStatusEnum = pgEnum("status", showSeatStatus);

const showSeatSchema = pgTable("shows", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  seatNo: varchar("seat_no", { length: 255 }).notNull(),
  price: real("price").notNull(),
  status: seatStatusEnum("status").notNull(),

  theatreSeatId: varchar("theatre_seat_id", { length: 255 })
    .notNull()
    .references(() => theatreSeatSchema.id),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default showSeatSchema;
