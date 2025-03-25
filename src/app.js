"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
require("dotenv/config");
var app = express();
app.get('/', function (req, res) { return res.send("hello"); });
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("My first Express app - listening on port ".concat(PORT, "!"));
});
