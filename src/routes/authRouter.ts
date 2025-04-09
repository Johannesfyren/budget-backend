import { Router } from "express";

const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/login", authController.C_loginUser);

module.exports = authRouter;
