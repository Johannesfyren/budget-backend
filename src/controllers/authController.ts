import * as db from "../db/index";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");

const C_loginUser = async (req: Request, res: Response) => {
	//Check if user exists
	const user = await db.getUser(req.body.email);
	console.log(user);
	if (!user) return res.status(400).send("No user found");

	//If found, check for PW
	try {
		if (await bcrypt.compare(req.body.password, user[0].password)) {
			const accessToken = jtw.sign(
				user[0],
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "1h" }
			);
			res.json({ accessToken: accessToken, userName: user[0].name });
		} else {
			res.send("Incorrect password");
		}
	} catch (err) {
		//Not found user
		console.log("error in getUsers", err);
		res.status(500).send("An error occurred");
	}
};

export { C_loginUser };
