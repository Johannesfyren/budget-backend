import { Router } from "express";
import authenticateToken from "../middleware/authentication";
const setupData = require("../controllers/setupData");

const indexRouter = Router();

indexRouter.get(
	"/setup/:sectionID",
	authenticateToken,
	setupData.C_getAllCategoriesFromSections
);
indexRouter.get(
	"/setup/getExpenses/:categoryID",
	authenticateToken,
	setupData.C_getExpenses
);
indexRouter.get(
	"/setup/expenses/getExpenseSummary",
	authenticateToken,
	setupData.C_getExpenseSummary
);

indexRouter.post(
	"/setup/postExpense/:expenseID",
	authenticateToken,
	setupData.C_postExpense
);
indexRouter.post(
	"/setup/newExpense",
	authenticateToken,
	setupData.C_newExpense
);
indexRouter.post(
	"/setup/createCategory/:sectionID",
	authenticateToken,
	setupData.C_createCategory
);
indexRouter.delete(
	"/setup/deleteExpense/:expenseID",
	authenticateToken,
	setupData.C_deleteExpense
);

module.exports = indexRouter;
