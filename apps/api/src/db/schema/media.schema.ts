import { createId } from "@paralleldrive/cuid2";
import type { MediaType } from "@seatsavvy/types";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import eventSchema from "./event.schema";

const mediaSchema = sqliteTable("medias", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  language: text("language").notNull(),
  imgUrl: text("img_url").notNull(),
  videoUrl: text("video_url"),
  type: text("type").notNull().$type<MediaType>(),

  eventId: text("event_id")
    .notNull()
    .references(() => eventSchema.id),

  createdAt: text("created_at")
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export default mediaSchema;
