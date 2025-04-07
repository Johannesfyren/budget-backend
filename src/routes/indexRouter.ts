import {Router} from "express";
const setupData = require("../controllers/setupData")

const indexRouter = Router();

//indexRouter.get('/', setupData.C_getUsers);
indexRouter.get('/setup/:sectionID', setupData.C_getAllCategoriesFromSections)


module.exports = indexRouter;
