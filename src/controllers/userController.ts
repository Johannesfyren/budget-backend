import * as db from "../db/index"
import { Request, Response } from "express";

const C_getUsers =  async (req: Request, res: Response) =>{
    try{
        const users = await db.getUsers();
        
        if(!users){
            console.log("error in getUsers");
            res.send("No users found")
        }
        console.log(users);
        return users;
    }catch(err){
        console.log("error in getUsers", err);
        res.status(500).send("An error occurred");
    }
}    