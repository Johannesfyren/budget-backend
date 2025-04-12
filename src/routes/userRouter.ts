import { Router } from "express";
import authenticateToken from "../middleware/authentication";
const userController = require("../controllers/userController");

const userRouter = Router();

//indexRouter.get('/', setupData.C_getUsers);
//userRouter.get("/getUsers", authenticateToken, userController.C_getUsers);
userRouter.post("/createUser", userController.C_createUser);

module.exports = userRouter;
