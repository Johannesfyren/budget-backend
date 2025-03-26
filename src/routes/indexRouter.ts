const { Router } = require ("express");
const setupData = require("../controllers/setupData")

const indexRouter = Router();

indexRouter.get('/', setupData.C_getUsers);

module.exports = indexRouter;
