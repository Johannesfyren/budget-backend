import express = require("express");
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
import "dotenv/config";
const corsConfig = require("./config/corsConfig");
const cors = require("cors");
const app = express();

app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`istening on port ${PORT}!`);
});
