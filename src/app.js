"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const indexRouter = require("./routes/indexRouter");
require("dotenv/config");
const app = express();
app.use('/', indexRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});
