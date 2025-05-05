import { Router } from "express";
import authenticateToken from "../middleware/authentication";
const setupData = require("../controllers/setupData");

const setupRouter = Router();

setupRouter.get(
	"/setup/:sectionID",
	authenticateToken,
	setupData.C_getAllCategoriesFromSections
);
setupRouter.get(
	"/setup/getExpenses/:categoryID",
	authenticateToken,
	setupData.C_getExpenses
);
setupRouter.get(
	"/setup/expenses/getExpenseSummary",
	authenticateToken,
	setupData.C_getExpenseSummary
);

setupRouter.post(
	"/setup/postExpense/:expenseID",
	authenticateToken,
	setupData.C_postExpense
);
setupRouter.post(
	"/setup/newExpense",
	authenticateToken,
	setupData.C_newExpense
);
setupRouter.post(
	"/setup/createCategory/:sectionID",
	authenticateToken,
	setupData.C_createCategory
);
setupRouter.delete(
	"/setup/deleteExpense/:expenseID",
	authenticateToken,
	setupData.C_deleteExpense
);

module.exports = setupRouter;
