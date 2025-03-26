import express = require ("express");
const indexRouter = require ("./routes/indexRouter");
import 'dotenv/config';
const app = express();

app.use('/',  indexRouter);



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`My first Express app - listening on port ${PORT}!`);
});