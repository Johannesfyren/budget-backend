import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, asc, sum, not, sql } from "drizzle-orm";
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
		.where(eq(expensesTable.FKCategoryID, categoryID))
		.orderBy(asc(expensesTable.id));
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

export async function newExpense(
	categoryID: number,
	name: string,
	value: number,
	payrate: number
) {
	return await db
		.insert(expensesTable)
		.values({
			FKCategoryID: categoryID,
			name: name,
			value: value,
			FKPayRate: payrate,
		})
		.returning();
}

export async function deleteExpense(expenseID: number) {
	return await db
		.delete(expensesTable)
		.where(eq(expensesTable.id, expenseID));
}

export async function getExpensesSum(userId: number) {
	return await db
		.select({
			total: sql<number>`
			SUM(
				CASE 
					WHEN ${expensesTable.FKPayRate} = 1 THEN ${expensesTable.value}
					WHEN ${expensesTable.FKPayRate} = 2 THEN ${expensesTable.value} / 3
					WHEN ${expensesTable.FKPayRate} = 3 THEN ${expensesTable.value} / 12
					ELSE 0
				END
			)
		`,
		})
		.from(expensesTable)
		.innerJoin(
			categoryTable,
			eq(expensesTable.FKCategoryID, categoryTable.id)
		)
		.where(
			and(
				eq(categoryTable.FKUserID, userId),
				not(eq(categoryTable.FKSectionID, 5))
			)
		);
}
export async function getIncomeSum(userID: number) {
	return await db
		.select({
			total: sql<number>`
			SUM(
				CASE 
					WHEN ${expensesTable.FKPayRate} = 1 THEN ${expensesTable.value}
					WHEN ${expensesTable.FKPayRate} = 2 THEN ${expensesTable.value} / 3
					WHEN ${expensesTable.FKPayRate} = 3 THEN ${expensesTable.value} / 12
					ELSE 0
				END
			)
		`,
		})
		.from(expensesTable)
		.innerJoin(
			categoryTable,
			eq(expensesTable.FKCategoryID, categoryTable.id)
		)
		.where(
			and(
				eq(categoryTable.FKUserID, userID),
				eq(categoryTable.FKSectionID, 5)
			)
		);
}
