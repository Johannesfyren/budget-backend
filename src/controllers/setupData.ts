import * as db from "../db/index";
import { Request, Response } from "express";

const C_getAllCategoriesFromSections = async (req: Request, res: Response) => {
	try {
		const sectionID = req.params.sectionID;
		if (req.user == undefined) return res.sendStatus(403);

		const data = await db.getAllCategoriesFromSections(
			Number(sectionID),
			req.user.id
		);

		if (!data) {
			console.log("error in getUsers");
			res.send("No users found");
		}
		console.log(data);
		res.json(data);
	} catch (err) {
		console.log("error in getUsers", err);
		res.status(500).send("An error occurred");
	}
};

//Getter
//Setter

export { C_getAllCategoriesFromSections };
