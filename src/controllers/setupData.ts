import * as db from "../db/index";
import { Request, Response } from "express";

const C_getAllCategoriesFromSections = async (req: Request, res: Response) => {
	try {
		const sectionID = req.params.sectionID;
		if (!req.user) return res.sendStatus(403);

		const data = await db.getAllCategoriesFromSections(
			Number(sectionID),
			req.user.id
		);

		if (!data) {
			console.log("error in getUsers");
			res.send("No users found");
		}

		res.json(data);
	} catch (err) {
		console.log("error in getUsers", err);
		res.status(500).send("An error occurred");
	}
};

//Getter

const C_getExpenses = async (req: Request, res: Response) => {
	try {
		const categoryID = req.params.categoryID;
		if (!req.user) return res.sendStatus(403);

		const data = await db.getExpenses(Number(categoryID));

		if (!data) {
			console.log("error in C_getExpenses");
			res.send("No users found");
		}

		res.json(data);
	} catch (err) {
		console.log("error in C_getExpenses", err);
		res.status(500).send("An error occurred");
	}
};
const C_getExpenseSummary = async (req: Request, res: Response) => {
	try {
		if (!req.user) return res.sendStatus(403);
		const userID = Number(req.user.id);
		const expenseSum = await db.getExpensesSum(userID);
		const incomeSum = await db.getIncomeSum(userID);
		// console.log("expenseSum", expenseSum);
		// console.log("incomeSum", incomeSum);
		if (!expenseSum || !incomeSum) {
			console.log("error in C_getExpenseSummary");
			res.send("Error fetching expenseSummary");
		}

		res.json({ expenseSum: expenseSum, incomeSum: incomeSum });
	} catch (err) {
		console.log("C_getExpenseSummary", err);
		res.status(500).send("C_getExpenseSummary - An error occurred");
	}
};
//Creator
const C_createCategory = async (req: Request, res: Response) => {
	try {
		const sectionID = req.params.sectionID;

		if (!req.user) return res.sendStatus(403);

		const data = await db.createCategory(
			req.user.id,
			req.body.name,
			Number(sectionID)
		);

		if (!data) {
			console.log("C_createCategory");
			res.send("C_createCategory");
		}

		res.status(200).send("err");
	} catch (err) {
		console.log("C_createCategorye", err);
		res.status(500).send("C_createCategory");
	}
};

const C_newExpense = async (req: Request, res: Response) => {
	try {
		if (!req.user) return res.sendStatus(403);

		const data = await db.newExpense(
			req.body.categoryID,
			req.body.name,
			req.body.value,
			req.body.payrate
		);

		if (!data) {
			console.log("newExpense is problem");
			res.sendStatus(404); //correct statuscode??
			return;
		}

		res.json(data);
	} catch (err) {
		console.log("newExpense: ", err);
		res.status(500).send("An error occurred - C_newExpense");
	}
};

//Setter
const C_postExpense = async (req: Request, res: Response) => {
	try {
		const expenseID = req.params.expenseID;

		if (!req.user) return res.sendStatus(403);

		const data = await db.postExpense(
			req.body.name,
			req.body.amount,
			req.body.payRate,
			req.body.categoryID,
			Number(expenseID)
		);

		if (!data) {
			console.log("error in postExpense");
			res.send("error in postExpense");
		}

		res.status(200).send("ok");
	} catch (err) {
		console.log("error in postExpense", err);
		res.status(500).send("error in postExpense- An error occurred");
	}
};

//Delete
const C_deleteExpense = async (req: Request, res: Response) => {
	try {
		const expenseID = Number(req.params.expenseID);

		if (!req.user) return res.sendStatus(403);

		const data = await db.deleteExpense(expenseID);

		if (!data) {
			console.log("error in C_deleteExpense");
			res.send("No users found");
		}

		res.status(200).send("ok");
	} catch (err) {
		console.log("error in C_deleteExpense", err);
		res.status(500).send("C_deleteExpense -An error occurred");
	}
};

export {
	C_getAllCategoriesFromSections,
	C_createCategory,
	C_postExpense,
	C_getExpenses,
	C_newExpense,
	C_deleteExpense,
	C_getExpenseSummary,
};
