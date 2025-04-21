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
		console.log("error in getUsers", err);
		res.status(500).send("An error occurred");
	}
};
//Setter
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
			res.send("No users found");
		}

		res.status(200).send("err");
	} catch (err) {
		console.log("C_createCategorye", err);
		res.status(500).send("An error occurred");
	}
};

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
			res.send("No users found");
		}

		res.status(200).send("ok");
	} catch (err) {
		console.log("error in postExpense", err);
		res.status(500).send("An error occurred");
	}
};

export {
	C_getAllCategoriesFromSections,
	C_createCategory,
	C_postExpense,
	C_getExpenses,
};
