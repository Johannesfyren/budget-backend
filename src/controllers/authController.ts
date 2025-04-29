import * as db from "../db/index";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");

const C_loginUser = async (req: Request, res: Response) => {
	//Check if user exists
	const user = await db.getUser(req.body.email);
	console.log(user);
	if (!user[0]) return res.status(401).send("No user found");

	//If found, check for PW
	try {
		if (await bcrypt.compare(req.body.password, user[0].password)) {
			const accessToken = jtw.sign(
				{
					id: user[0].id,
					name: user[0].name,
					email: user[0].email,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "1h" }
			);
			res.json({ accessToken: accessToken, userName: user[0].name });
		} else {
			res.status(401).send("Invalid email or password");
		}
	} catch (err) {
		//Not found user
		console.log("error in loginUser", err);
		res.status(500).send("An error occurred during login");
	}
};

export { C_loginUser };
