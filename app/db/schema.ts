import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstname: varchar(),
  lastname: varchar(),
  employed: varchar(),
  active: boolean().default(true),
  birthdate: date(),
  email: varchar(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  products: many(usersToProducts),
}));

export const product = pgTable("product", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "product_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar(),
	description: varchar(),
	price: integer(),
	stock: integer(),
	image: varchar(),
	category: varchar(),
	subCategory: varchar(),
	brand: varchar(),
	color: varchar(),
	size: varchar(),
	material: varchar(),
	style: varchar(),
	type: varchar(),
	usage: varchar(),
	origin: varchar(),
	dimensions: varchar(),
	weight: integer(),
	createdAt: timestamp({ mode: 'string' }).defaultNow(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow(),
});

export const productRelations = relations(product, ({ many }) => ({
  users: many(usersToProducts),
}));

export const usersToProducts = pgTable("users_to_products", {
	userId: integer().notNull().references(() => users.id),
	productId: integer().notNull().references(() => product.id),
}, (t) => [
	primaryKey({ columns: [t.userId, t.productId] }),
]);

export const usersToProductsRelations = relations(usersToProducts, ({ one }) => ({
  user: one(users, {
    fields: [usersToProducts.userId],
    references: [users.id],
  }),
  product: one(product, {
    fields: [usersToProducts.productId],
    references: [product.id],
  }),
}));