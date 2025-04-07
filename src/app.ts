import express = require ("express");
const indexRouter = require ("./routes/indexRouter");
const authRouter = require ("./routes/authRouter")
import 'dotenv/config';
const cors = require ("cors");
const app = express();
const corsOptions = {
    origin: ['http://localhost:5173'], // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "*",
};
  
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use('/',  indexRouter);
app.use('/auth', authRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`My first Express app - listening on port ${PORT}!`);
});