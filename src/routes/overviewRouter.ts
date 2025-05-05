import { Router } from "express";
import authenticateToken from "../middleware/authentication";
const overviewController = require("../controllers/overviewController");

const overviewRouter = Router();

overviewRouter.get(
	"/",
	authenticateToken,
	overviewController.C_getAllCategoriesFromSections
);

module.exports = overviewRouter;
