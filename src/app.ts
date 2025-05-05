import express = require("express");
const setupRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const overviewRouter = require("./routes/overviewRouter");
import "dotenv/config";
const corsConfig = require("./config/corsConfig");
const cors = require("cors");
const app = express();

app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", setupRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/overview", overviewRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`istening on port ${PORT}!`);
});
