import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { categoryTable, expensesTable, sectionsTable, usersTable } from './schema';
import 'dotenv/config';
import { error } from 'console';

const db = drizzle(process.env.DATABASE_URL!);


//User queries
export async function getUsers() {
    return await db.select().from(usersTable);
}

//Category queries
export async function getAllCategoriesFromSections(sectionID: number) {
  return await db.select({
    category: categoryTable.name,
    expenseName: expensesTable.name,
    expenseValue: expensesTable.value,
    payRate: expensesTable.FKPayRate,
      })
    .from(expensesTable)
    .innerJoin(categoryTable, eq(categoryTable.id, expensesTable.FKCategoryID))
    .where(eq(categoryTable.FKSectionID, sectionID));

}


//expenses queries
export async function getExpenses() {
  return await db.select().from(usersTable);
}


