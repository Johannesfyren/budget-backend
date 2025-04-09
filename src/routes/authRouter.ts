import { Router } from "express";
import authenticateToken from "../middleware/authentication";
const userController = require("../controllers/userController");

const authRouter = Router();

//indexRouter.get('/', setupData.C_getUsers);
authRouter.get("/getUsers", authenticateToken, userController.C_getUsers);
authRouter.post("/createUser", userController.C_createUser);
authRouter.post("/login", userController.C_loginUser);

module.exports = authRouter;
