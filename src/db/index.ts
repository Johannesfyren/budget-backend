import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and } from "drizzle-orm";
import {
	categoryTable,
	expensesTable,
	sectionsTable,
	usersTable,
} from "./schema";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL!);

//User queries
export async function getAllUsers() {
	return await db.select().from(usersTable);
}
export async function getUser(email: string) {
	return await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, email));
}

export async function createUser(
	name: string,
	email: string,
	password: string
) {
	return await db
		.insert(usersTable)
		.values({ name: name, email: email, password: password });
}

//Category queries
export async function getAllCategoriesFromSections(
	sectionID: number,
	userID: number
) {
	return await db
		.select({
			category: categoryTable.name,
			expenseName: expensesTable.name,
			expenseValue: expensesTable.value,
			payRate: expensesTable.FKPayRate,
		})
		.from(expensesTable)
		.innerJoin(
			categoryTable,
			eq(categoryTable.id, expensesTable.FKCategoryID)
		)
		.where(
			and(
				eq(categoryTable.FKSectionID, sectionID),
				eq(categoryTable.FKUserID, userID)
			)
		);
}

//expenses queries
export async function getExpenses() {
	return await db.select().from(usersTable);
}
