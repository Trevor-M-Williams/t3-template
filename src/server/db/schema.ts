import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `${name}`);

export const images = createTable("images", {
  id: serial("id").primaryKey(),
  pathname: varchar("name", { length: 256 }),
  url: varchar("url", { length: 512 }),
  downloadUrl: varchar("download_url", { length: 512 }),
  size: integer("size"),
  watermark: boolean("watermark").default(false),
  product: integer("product")
    .references(() => products.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  clerkID: varchar("clerk_id", { length: 256 }).unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const products = createTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  price: integer("price").notNull(),
  stripeID: varchar("stripe_id", { length: 256 }).unique().notNull(),
  stripeUrl: varchar("stripe_url", { length: 512 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const userProducts = createTable("user_products", {
  id: serial("id").primaryKey(),
  userID: integer("user_id")
    .references(() => users.id)
    .notNull(),
  productID: integer("product_id")
    .references(() => products.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
