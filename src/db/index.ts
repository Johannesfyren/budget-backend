import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, asc } from "drizzle-orm";
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
			categoryID: categoryTable.id,
		})
		.from(categoryTable)
		.where(
			and(
				eq(categoryTable.FKUserID, userID),
				eq(categoryTable.FKSectionID, sectionID)
			)
		)
		.orderBy(asc(categoryTable.id));
}

export async function createCategory(
	userID: number,
	name: string,
	sectionID: number
) {
	return await db.insert(categoryTable).values({
		FKUserID: userID,
		name: name,
		FKSectionID: sectionID,
	});
}

//expenses queries
export async function getExpenses(categoryID: number) {
	return await db
		.select()
		.from(expensesTable)
		.where(eq(expensesTable.FKCategoryID, categoryID));
}

export async function postExpense(
	name: string,
	amount: number,
	payRate: number,
	categoryID: number,
	expenseID: number
) {
	return await db
		.update(expensesTable)
		.set({
			FKCategoryID: categoryID,
			value: amount,
			FKPayRate: payRate,
			name: name,
		})
		.where(eq(expensesTable.id, expenseID));
}

//Gammel function som returnerer for meget.
// export async function getAllCategoriesFromSections(
// 	sectionID: number,
// 	userID: number
// ) {
// 	return await db
// 		.select({
// 			category: categoryTable.name,
// 			categoryID: categoryTable.id,
// 			expenseName: expensesTable.name,
// 			expenseValue: expensesTable.value,
// 			payRate: expensesTable.FKPayRate,
// 			expenseID: expensesTable.id,
// 		})
// 		.from(expensesTable)
// 		.innerJoin(
// 			categoryTable,
// 			eq(categoryTable.id, expensesTable.FKCategoryID)
// 		)
// 		.where(
// 			and(
// 				eq(categoryTable.FKSectionID, sectionID),
// 				eq(categoryTable.FKUserID, userID)
// 			)
// 		)
// 		.orderBy(asc(categoryTable.id));
// }
