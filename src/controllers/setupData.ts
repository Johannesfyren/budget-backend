import * as db from "../db/index"

export const getUsers =  async (req: Request, res: Response) =>{
    const users = await db.getUsers();
    console.log(users);
}    

//Getter
//Setter