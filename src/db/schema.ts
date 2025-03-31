import { doublePrecision, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const sectionsTable = pgTable("sections", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});


export const categoryTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  FKUserID: integer("FK_user_ID").references(()=>usersTable.id, {onDelete: 'cascade'}),
  FKSectionID: integer("FK_section_ID").references(() => sectionsTable.id),
});

export const expensesTable = pgTable("expenses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  FKCategoryID: integer("FK_category_ID").references(()=>categoryTable.id, {onDelete: 'cascade'}),
  name: varchar({ length: 255 }).notNull(),
  value: doublePrecision(),
});