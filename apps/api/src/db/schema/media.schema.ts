import { createId } from "@paralleldrive/cuid2";
import { mediaTypes } from "@seatsavvy/types";
import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const typeEnum = pgEnum("type", mediaTypes);

const mediaSchema = pgTable("medias", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  language: varchar("language", { length: 255 }).notNull(),
  imgUrl: varchar("img_url", { length: 255 }).notNull(),
  videoUrl: varchar("video_url", { length: 255 }),
  type: typeEnum("type").notNull(),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export default mediaSchema;
