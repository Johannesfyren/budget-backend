"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var indexRouter = require("./routes/indexRouter");
require("dotenv/config");
var app = express();
app.use('/', indexRouter);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("My first Express app - listening on port ".concat(PORT, "!"));
});
