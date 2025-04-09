import { Router } from "express";
import authenticateToken from "../middleware/authentication";
const setupData = require("../controllers/setupData");

const indexRouter = Router();

indexRouter.get(
	"/setup/:sectionID",
	authenticateToken,
	setupData.C_getAllCategoriesFromSections
);

module.exports = indexRouter;
