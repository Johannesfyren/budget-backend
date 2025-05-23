import {
	doublePrecision,
	integer,
	pgTable,
	varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull().default("0"),
});

export const sectionsTable = pgTable("sections", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
});

export const categoryTable = pgTable("categories", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	FKUserID: integer("FK_user_ID").references(() => usersTable.id, {
		onDelete: "cascade",
	}),
	FKSectionID: integer("FK_section_ID").references(() => sectionsTable.id),
});

export const expensesTable = pgTable("expenses", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	FKCategoryID: integer("FK_category_ID").references(() => categoryTable.id, {
		onDelete: "cascade",
	}),
	name: varchar({ length: 255 }).notNull(),
	value: doublePrecision(),
	FKPayRate: integer("FK_payrate_ID")
		.references(() => payRate.id)
		.default(1),
});

export const payRate = pgTable("payrate", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	rate: varchar({ length: 10 }).notNull(),
});
