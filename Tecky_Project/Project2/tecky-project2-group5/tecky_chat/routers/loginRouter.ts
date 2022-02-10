// import from library
import { Router } from "express";
import { Request, Response } from "express";

// import from our ts file
import { client } from "../app";
import { checkPassword } from "../hash";
import { logger } from "../logger";

// import type
import { User } from "../models";
import { tables } from "../tables";

export const loginRoutes = Router();

loginRoutes.post("/login", login);


async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Invalid username or password." });
        return;
    }
    const queryResult = await client.query<User>(/*sql*/ `SELECT * FROM ${tables.userData} WHERE user_name = $1`, [
        username,
    ]);
    const user = queryResult.rows[0];

    if (!user || !(await checkPassword(password, user.user_password))) {
        res.status(400).json({ message: "Invalid username or password." });
        return;
    }

    req.session["user_name"] = user.user_name;
    req.session["user_id"] = user.user_id;
    req.session["nickname"] = user.nickname;
    req.session["user_profilepic"] = user.user_profilepic;

    logger.debug("user_name : " + req.session["user_name"]);
    logger.debug("user_id : " + req.session["user_id"]);
    // req.session["chatroom_list"] = [1,2,3]
    // res.status(200).json({message: "success"});
    res.status(200).redirect("/chatroom.html");
}
