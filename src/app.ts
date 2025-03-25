import express = require ("express");
import * from "./routes/baseRoutes"
import 'dotenv/config';
const app = express();

app.use('/', (req: any, res:any) => res.send("hello"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`My first Express app - listening on port ${PORT}!`);
});