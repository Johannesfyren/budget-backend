import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { categoryTable, sectionsTable, usersTable } from './schema';
import 'dotenv/config';
import { error } from 'console';

const db = drizzle(process.env.DATABASE_URL!);


//User queries
export async function getUsers() {
    return await db.select().from(usersTable);
}

//Category queries
export async function getAllCategoriesFromSections(sectionID: number) {
  return await db.select().from(categoryTable).leftJoin(sectionsTable, eq(categoryTable.FKSectionID, sectionsTable.id)).where(eq(sectionsTable.id, sectionID));
}


//expenses queries
export async function getExpenses() {
  return await db.select().from(usersTable);
}


