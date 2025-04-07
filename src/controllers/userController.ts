import * as db from "../db/index"
import { Request, Response } from "express";
const bcrypt = require("bcrypt")

const C_getUsers =  async (req: Request, res: Response) =>{
    try{
        const users = await db.getUsers();
        
        if(!users){
            console.log("error in getUsers");
            res.send("No users found")
        }
        console.log(users);
        res.json(users);
        return users;
    }catch(err){
        console.log("error in getUsers", err);
        res.status(500).send("An error occurred");
    }
}    


const C_createUser = async (req: Request, res: Response) =>{

    try{
        const hashedPW = await bcrypt.hash(req.body.password, 10);
        const users = db.createUser(req.body.name, req.body.email, hashedPW);
        
        return users;
    }catch(err){
        console.log("error in getUsers", err);
        res.status(500).send("An error occurred");
    }
}


export {
    C_getUsers,
    C_createUser
}