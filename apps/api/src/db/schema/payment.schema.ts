import { createId } from "@paralleldrive/cuid2";
import { pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

const paymentSchema = pgTable("payments", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  amount: real("price").notNull(),
  paidAt: timestamp("paid_at", { mode: "string" }).notNull().defaultNow(),
  transactionId: varchar("transaction_id", { length: 255 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 255 }).notNull(),

  bookingId: varchar("booking_id", { length: 255 }).notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default paymentSchema;
