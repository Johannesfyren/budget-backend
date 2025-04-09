const jtw = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";

declare namespace Express {
	export interface Request {
		user?: object;
	}
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) {
		res.sendStatus(401);
		return;
	}
	const user = jtw.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err: Error, user: object) => {
			if (err) return res.sendStatus(403);
			req.user = user;
			next();
		}
	);
}

export default authenticateToken;
