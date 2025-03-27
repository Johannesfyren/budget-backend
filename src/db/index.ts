import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { usersTable } from './schema';
import 'dotenv/config';
import { error } from 'console';

const db = drizzle(process.env.DATABASE_URL!);


//User queries
export async function getUsers() {
    return await db.select().from(usersTable);
}

//Category queries
export async function getCategories() {
  return await db.select().from(usersTable);
}


//expenses queries
export async function getExpenses() {
  return await db.select().from(usersTable);
}





// export async function main() {
//   const user: typeof usersTable.$inferInsert = {
//     name: 'Johannes Hergaard',
//     email: 'hergaardjohannes@gmail.com',
//   };

//   await db.insert(usersTable).values(user);
//   console.log('New user created!')
// }

//   const users = await db.select().from(usersTable);
//   console.log('Getting all users from the database: ', users)
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */
// try{
//   await db
//     .update(usersTable)
//     .set({
//       age: 31,
//     })
//     .where(eq(usersTable.email, user.email));
//   console.log('User info updated!')
// }catch(error){
//     console.log(error)
// }
  
//   await db.delete(usersTable).where(eq(usersTable.email, user.email));
//   console.log('User deleted!')

// }


