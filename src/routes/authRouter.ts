import {Router} from "express";
const userController = require("../controllers/userController")

const authRouter = Router();

//indexRouter.get('/', setupData.C_getUsers);
authRouter.get('/getUsers', userController.C_getUsers)
authRouter.post('/createUser', userController.C_createUser)
authRouter.post('/login', userController.C_loginUser)


module.exports = authRouter;
