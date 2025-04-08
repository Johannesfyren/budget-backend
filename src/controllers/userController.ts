import * as db from "../db/index";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");

const C_getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.getAllUsers();

    if (!users) {
      console.log("error in getUsers");
      res.send("No users found");
    }
    console.log(users);
    res.json(users);
    return users;
  } catch (err) {
    console.log("error in getUsers", err);
    res.status(500).send("An error occurred");
  }
};

const C_createUser = async (req: Request, res: Response) => {
  try {
    const hashedPW = await bcrypt.hash(req.body.password, 10);
    const users = db.createUser(req.body.name, req.body.email, hashedPW);
    res.status(200).send();
    //return users;
  } catch (err) {
    console.log("error in getUsers", err);
    res.status(500).send("An error occurred");
  }
};

const C_loginUser = async (req: Request, res: Response) => {
  //Check if user exists
  const user = await db.getUser(req.body.email);
  if (!user) return res.status(400).send("No user found");

  //If found, check for PW
  try {
    if (await bcrypt.compare(req.body.password, user[0].password)){
        res.json(user);
    } else{
        console.log()
        res.send("Incorrect password")
    }

  } catch (err) {
    //Not found user
    console.log("error in getUsers", err);
    res.status(500).send("An error occurred");
  }
};

export { C_getUsers, C_createUser, C_loginUser };
