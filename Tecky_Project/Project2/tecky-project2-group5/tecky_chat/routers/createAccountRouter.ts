// import from library
// import { Router } from "express";
// import { Request, Response } from "express";

// import from our ts file
// import { client } from "../app";
// import { hashPassword } from "../hash";
// import { logger } from "../logger";
// import { logger } from "../logger";

// import type
// import { User } from "../models";
// import { tables } from "../tables";

// export const createAccountRouter = Router();

// createAccountRouter.post("/create_account123",upload.single("profile"), createAccount);

// async function createAccount(req: Request, res: Response) {
//     // logger.debug("req.body")
//     const inputUsername = req.body.inputUsername;
//     const inputPassword = req.body.inputPassword;
//     const inputNickname = req.body.inputNickname;
//     const filename = req.file?.filename;
//     // logger.debug(inputUsername)
//     // logger.debug(inputPassword)
//     // logger.debug(inputNickname)
    
//     // logger.debug(JSON.stringify(req.body))
//     const password = await hashPassword(inputPassword)
//     // logger.debug("password")
//     // logger.debug(password)
//     if(!filename){
//     await client.query(/*sql*/ `insert into users_data (user_name, nickname, user_password) VALUES ($1,$2,$3)`, [
//         inputUsername,
//         inputNickname,
//         password,
//     ])} else {  
//         await client.query(/*sql*/ `insert into users_data (user_name, nickname, user_password,user_profilepic) VALUES ($1,$2,$3,$4)`, [
//         inputUsername,
//         inputNickname,
//         password,
//         filename])
//     }
//     res.status(200).redirect("/login.html");
// }



// app.post("/create_account", upload.single("profile"),async(req, res, next)=>{
//     const inputUsername = req.body.inputUsername;
//     const inputPassword = req.body.inputPassword;
//     const inputNickname = req.body.inputNickname;
//     const filename = req.file?.filename;


//     console.log(inputUsername);
//     console.log(inputPassword);
//     console.log(inputNickname);
//     console.log(filename);
//     console.log("hihi")
//     next;
// });
// app.use(express.static(path.join(__dirname, "uploads")));