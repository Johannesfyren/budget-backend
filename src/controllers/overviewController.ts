import * as db from "../db/index";
import { Request, Response } from "express";

interface ExpenseData {
	sectionID: number;
	total: number;
}

const C_getAllCategoriesFromSections = async (req: Request, res: Response) => {
	const sectionNames = ["Fixed", "Variable", "Seasonal", "Savings"];
	try {
		const sectionID = req.params.sectionID;
		if (!req.user) return res.sendStatus(403);

		let data: ExpenseData[] = await db.getUserExpenseSumBySection(
			req.user.id
		);

		if (!data) {
			console.log("error in getUsers");
			res.send("No users found");
		}
		//Switch out numbres for meaning full titles to frontend
		const updatedData = data.map((item) => {
			switch (item.sectionID) {
				case 1:
					return { ...item, sectionID: "Fixed" };
					break;
				case 2:
					return { ...item, sectionID: "Variable" };
					break;
				case 3:
					return { ...item, sectionID: "Seasonal" };
					break;
				case 4:
					return { ...item, sectionID: "Savings" };
				default:
					return item;
			}
		});

		// console.log(data.some((item) => item.sectionID == 3));
		console.log(updatedData);
		res.json(updatedData);
	} catch (err) {
		console.log("error in getUsers", err);
		res.status(500).send("An error occurred");
	}
};

export { C_getAllCategoriesFromSections };
