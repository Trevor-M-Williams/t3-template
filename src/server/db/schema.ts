import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `t3-template_${name}`);

export const images = createTable("image", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  url: varchar("url", { length: 512 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});
