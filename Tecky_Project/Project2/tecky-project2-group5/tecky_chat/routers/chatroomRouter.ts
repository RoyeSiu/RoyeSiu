// import from library
import { Router } from "express";
import { Request, Response } from "express";

// import from our ts file
import { client } from "../app";
import { io } from "../app";

import { logger } from "../logger";

// import type
// import { User } from "../models";
import { tables } from "../tables";

export const chatroomRouter = Router();

chatroomRouter.put("/chatroomList", chatroomList);
chatroomRouter.post("/select_chatroom", select_chatroom_id);
chatroomRouter.put("/get_message", get_message);
chatroomRouter.post("/create_new_group", create_new_group);
chatroomRouter.post("/send_message", send_message);

chatroomRouter.post("/getUserData", getUserData);
chatroomRouter.put("/get_pre_game_room", getPreGameRoom);
chatroomRouter.post("/join_table", joinTable);
chatroomRouter.delete("/quit_table", quitTable);
chatroomRouter.post("/add_new_table", addNewTable);
chatroomRouter.delete("/delete_table", deleteTable);
chatroomRouter.put("/change_table_type", changeTableType);
chatroomRouter.post("/play_game", playGame);
chatroomRouter.post("/searchMessage", searchMessage);

chatroomRouter.put("refresh-unread-msg", refreshUnreadMsg);
chatroomRouter.delete("/logout", logout);




async function searchMessage(req: Request, res: Response) {
    // const userId = req.session["user_id"];
    const chatRoomId = req.session["selectchatroomid"];
    const searchinput = req.body.searchInput;
    // logger.debug("selectchatroomid : " + req.session["selectchatroomid"]);
    // logger.debug("req.body.searchInput : " + req.body.searchInput);

    const queryResult = await client.query(
        /*sql*/ `select message_id, chatroom_id, message_data.user_id, users_data.nickname, message_content, is_code, image from message_data inner join users_data on message_data.user_id = users_data.user_id where message_content LIKE '%'||$1||'%' AND chatroom_id = $2 ORDER BY created_at DESC;`,
        [searchinput, chatRoomId]
        // /*sql*/ `select * from message_data where message_content LIKE '%search%' AND (chatroom_id, user_id) = ($1,$2) ORDER BY created_at;`,
        // [chatroomid, userId]
    );
    const messageResult = queryResult.rows;
    logger.debug("messageResult : " + messageResult);

    res.json({ data: messageResult });
}

async function getUserData(req: Request, res: Response) {
    const userName = req.session["user_name"];
    const userId = req.session["user_id"];
    const nickname = req.session["nickname"];
    const selectchatroomid = req.session["select_chatroom_id"];
    const user_profilepic = req.session["user_profilepic"]

    res.json({ data: { userId, userName, nickname, selectchatroomid,user_profilepic } });
}

async function select_chatroom_id(req: Request, res: Response) {
    // logger.debug("select_chatroom_id : " + req.session["chatroom_list"]);
    logger.debug("selectchatroomid : " + req.session["selectchatroomid"]);
    logger.debug("req.body.chatroom_id : " + req.body.chatroom_id);
    await client.query(/*sql*/ `update chatroom_users set unread_msg = 0 WHERE (chatroom_id,user_id)=($1,$2)`, [
        req.body.chatroom_id,
        req.session["user_id"],
    ]);
    if (!req.session["selectchatroomid"]) {
        await client.query(
            /*sql*/ `UPDATE chatroom_users set time_of_logout = now() where (chatroom_id,user_id)=($1,$2);`,
            [req.body.chatroom_id, req.session["user_id"]]
        );
    } else {
        await client.query(
            /*sql*/ `UPDATE chatroom_users set time_of_logout = now() where (chatroom_id,user_id)=($1,$2);`,
            [req.session["selectchatroomid"], req.session["user_id"]]
        );
    }
    try {
        await client.query(
            /*sql*/ `UPDATE chatroom_users set (time_of_login,time_of_logout) = (now(),now()) where (chatroom_id,user_id)=($1,$2);`,
            [req.body.chatroom_id, req.session["user_id"]]
        );
        // logger.debug("previous_chatroom_id : " + previous_chatroom_id);

        req.session["selectchatroomid"] = req.body.chatroom_id;

        /*----------------test unread message--------------------*/
        io.to(`user-${req.session["user_id"]}`).emit("refresh-chatroom-list");
        /*********************************************************************/
        res.status(200).json({ message: "update selectchatroomid success" });

        //     const testselect = await client.query(
        //         /*sql*/ `select chatroom_login_id from chatroom_login where (chatroom_id,user_id) = ($1,$2) AND logout_at is null`,
        //         [req.session["selectchatroomid"], req.session["user_id"]])
        // logger.debug("testselect : " + testselect);

        //         if (testselect) {
        //         await client.query(
        //             /*sql*/ `UPDATE chatroom_login set logout_at= CURRENT_TIMESTAMP where chatroom_login_id = (select chatroom_login_id from chatroom_login where (chatroom_id,user_id) = ($1,$2));`,
        //             [req.session["selectchatroomid"], req.session["user_id"]]
        //         );
        //     } else {await client.query(
        //         /*sql*/ `insert into chatroom_login (chatroom_id,user_id) values ($1,$2)`,[req.session["selectchatroomid"], req.session["user_id"]]
        //     )}
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function refreshUnreadMsg(req: Request, res: Response) {
    const queryResult = await client.query(
        /*sql*/ `select chatroom_id unread_msg from chatroom_users where (user_id,chatroom_id) = ($1,$2)`,
        [req.session["user_id"], req.session["chatroom_list"]]
    );
    const unreadMsgList = queryResult.rows;
    res.json({ data: unreadMsgList });
}

async function chatroomList(req: Request, res: Response) {
    logger.debug("chatroomList");
    const queryResult = await client.query(
        /*sql*/
        `with listresult as (
            select chatroom_id,max(created_at)from message_data group by chatroom_id
            )
            ,result as (
                SELECT DISTINCT ON (chatroom_Users.chatroom_id) chatroom.chatroom_name,
                    chatroom_Users.chatroom_id,
                    chatroom_Users.unread_msg,
                    listresult.max
                FROM chatroom_Users
                    INNER JOIN chatroom ON chatroom_users.chatroom_id = chatroom.chatroom_id
                    LEFT JOIN listresult ON chatroom.chatroom_id = listresult.chatroom_id
                WHERE chatroom_users.user_id = $1
            )
            select * from result order by max DESC nulls LAST`,
        [req.session["user_id"]]

        // /*sql*/ `select chatroom.chatroom_id, chatroom_name,unread_msg from chatroom_Users inner join chatroom on chatroom_users.chatroom_id = chatRoom.chatroom_id inner join message_data on chatRoom.chatroom_id = message_data.chatroom_id where message_data.user_id = $1 order by message_data.created_at DESC;`,
        // [req.session["user_id"]]
    );
    // console.log('queryResult')
    // console.log(queryResult)
    const chatroomList = queryResult.rows;
    const chatroomListIDArr = [];

    for (let myKey in chatroomList) {
        chatroomListIDArr.push(chatroomList[myKey].chatroom_id);
    }
    // req.session["selectchatroom"] = queryResult.rows[0];
    req.session["chatroom_list"] = chatroomListIDArr;
    // req.session["chatroom_list"] = [1,2,3,4,9,9,9,9,9];

    req.session.save();

    logger.debug(req.session["chatroom_list"]);
    res.json({ data: chatroomList });
}

async function get_message(req: Request, res: Response) {
    const chatroom_id = req.session["selectchatroomid"];
    const queryResult = await client.query(
        /*sql*/ `select message_id, chatroom_id, created_at, users_data.user_id, message_content, is_code, message_data.image, attachment, users_data.user_name, nickname from ${tables.messageData} inner join ${tables.userData} on ${tables.messageData}.user_id = ${tables.userData}.user_id where chatroom_id = $1 order by created_at`,
        [chatroom_id]
    );
    const messageObj = queryResult.rows;
    res.json({ data: messageObj });
}

// for send message
// not finish
async function send_message(req: Request, res: Response) {
    const iscode = req.body.isCode;
    const chatRoomId = req.session["selectchatroomid"];
    const userId = req.session["user_id"];
    const content = req.body.messageInputValue;
    // const filename = req.file?.filename;
    const queryResult = await client.query(
        /*sql*/ `INSERT INTO ${tables.messageData} ( chatroom_id,user_id,message_content,is_code) VALUES ($1, $2, $3,$4) RETURNING (created_at)`,
        [chatRoomId, userId, content, iscode]
    );
    const resultList = queryResult.rows[0];
    await client.query(
        /*sql*/ ` UPDATE chatroom_users set unread_msg = unread_msg + 1 where chatroom_id = $1 and time_of_logout < $2 and user_id != $3`,
        [chatRoomId, JSON.stringify(resultList.created_at), userId]
    );
    // const queryResult = await client.query(`SELECT user_id FROM ${tables.chatroomUsers} WHERE chatroom_id = $1`,
    // [chatRoomId]);

    // const user_id_obj =  queryResult.rows[0];

    io.to(`chatroom-${chatRoomId}`).emit("refresh-message");
    io.to(`chatroom-${chatRoomId}`).emit("refresh-unread-msg");

    res.json({ message: "success" });
}

async function create_new_group(req: Request, res: Response) {
    try {
        const newUsernameArr = req.body.newUsernameArr;
        let newUserList = "('" + newUsernameArr.join("','") + "')";
        const createUesrId = req.session["user_id"];
        // const userlist = newUsernameArr
        const newGroupName = req.body.newGroupName;
        // console.log('req.body.newUsernameArr')
        // console.log(req.body.newUsernameArr)
        // console.log('newUsernameArr')
        // console.log(newUsernameArr)
        // console.log('newUserList')
        // console.log(newUserList)
        // console.log(req.session["user_id"])
        const createChatroomId = await client.query(
            /*sql*/ `with id as (insert into chatroom (chatroom_name, created_by_user_id) values ($1, $2) RETURNING chatroom_id) select chatroom_id from id`,
            [newGroupName, createUesrId]
        );

        const creatChatroomIdNum = createChatroomId.rows.map((item) => Object.values(item)[0]).toString();

        await client.query(/*sql*/ `insert into chatroom_users (chatroom_id, user_id,unread_msg)VALUES ($1,$2,0)`, [
            creatChatroomIdNum,
            createUesrId,
        ]);
        // console.log('createChatroomId')
        // console.log(createChatroomId.rows.map(item => Object.values(item)[0]))
        // const addUserIdList = await client.query(/*sql*/`select user_id from users_data where user_name in ('roye','roye2')`)
        // const addUserIdList = await client.query(/*sql*/`select user_id from users_data where user_name in ($1);`,[newUsernameArr]);
        const addUserIdList = await client.query(
            /*sql*/ `select user_id from users_data where user_name in ${newUserList};`
        );
        // console.log('addUserIdList')
        // console.log(addUserIdList)
        const addUserIdNums = addUserIdList.rows.map((item) => Object.values(item)[0]);
        // const addUserIdNums = addUserIdList.rows.map(item => Object.values(item)[0]).toString()
        // console.log('addUserIdNums')
        // console.log(addUserIdNums)
        // await client.query(/*sql*/`insert into chatroom_users (chatroom_id, user_id)VALUES ('79', '1')`)

        for (let addUserIdNum of addUserIdNums) {
            await client.query(
                /*sql*/ `insert into chatroom_users (chatroom_id, user_id,unread_msg,time_of_login,time_of_logout)VALUES ($1,$2,0,now(),now())`,
                [creatChatroomIdNum, addUserIdNum]
            );
            // await client.query(/*sql*/ `insert into chatroom_users (chatroom_id, user_id,unread_msg)VALUES ($1,$2,0)`, [
            //     creatChatroomIdNum,
            //     addUserIdNum,
            // ]);
            // console.log(creatChatroomIdNum, addUserIdNum);
        }

        // console.log(addUserIdNums);

        for (const addUserIdNum of addUserIdNums) {
            io.to(`user-${addUserIdNum}`).emit("refresh-chatroom-list");
        }
    } catch (err) {
        console.error(err.message);
    }

    // const addUserIdNum = addUserIdList.rows
    // console.log(addUserIdNum)
    // newUsernameArr.unshift(req.session["user_name"]);
    // let myStr = "('" + newUsernameArr.join("','") + "')";
    // myStr = `select * from users_data where user_name in ` + myStr + `;`;

    // console.log(myStr)
    // for (let newUser of newUsernameArr){
    //     newUser += `'${newUser}',`
    // }
    // console.log(myStr);
    //     try {
    //         const queryResult = await client.query(/*sql*/ myStr, []);
    //         const newUserData = queryResult.rows;

    //         await client.query(
    //             /*sql*/ `insert into chatroom (chatroom_name, created_by_user_id)
    //         VALUES ($1, $2);`,
    //             [newGroupName, req.session["user_name"]]
    //         );
    //         for (let myKey in newUserData) {
    //             const newUser_id = newUserData[myKey]["user_id"];

    //             await client.query(
    //                 /*sql*/ `insert into chatroom_users (chatroom_id, user_id)
    // VALUES ($1, $2);`,
    //                 [],
    //                 [newGroupName, req.session["user_name"]]
    //             );
    //         }
    // } catch (err) {
    //         console.error(err.message);
    //     }

    res.json({ message: "create group success" });
}

async function getPreGameRoom(req: Request, res: Response) {
    logger.debug("initPreGameCardData");
    let myResult = {};

    try {
        const queryResult = await client.query(
            /*sql*/ `select * from ${tables.preGameRoomData} where chatroom_id = $1 order by game_table_id;`,
            [req.body.chatroom_id]
        );
        const gameTableIDs = queryResult.rows;

        // logger.debug(JSON.stringify(gameTableIDs));
        // log like this
        // [{"game_table_id":1},{"game_table_id":2},{"game_table_id":3},{"game_table_id":4},{"game_table_id":5}]

        for (const game_table_id_obj of gameTableIDs) {
            const gameTableID = game_table_id_obj["game_table_id"];
            const gameType = game_table_id_obj["game_type"];
            const gameStatus = game_table_id_obj["game_status"];

            const tempQueryResult = await client.query(
                /*sql*/ `
                SELECT ${tables.preGameRoomUser}.user_id,
                    ${tables.userData}.nickname
                FROM ${tables.preGameRoomUser}
                    INNER JOIN ${tables.userData} ON ${tables.preGameRoomUser}.user_id = ${tables.userData}.user_id
                WHERE game_table_id = $1
                ORDER BY nickname
            `,
                [gameTableID]
            );
            const user_id_obj = tempQueryResult.rows;
            myResult[gameTableID] = { user_id_obj, gameType, gameStatus };
        }
        logger.debug(JSON.stringify(myResult));
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    res.json({ data: myResult });
}

async function joinTable(req: Request, res: Response) {
    logger.debug("join table");
    const targetChatroomID = req.body.chatroom_id;

    try {
        const gameTableID = req.body.gameTableID;
        const myUserID = req.body.myUserID;
        console.log(gameTableID, myUserID);

        await client.query(
            /*sql*/ `
        INSERT INTO ${tables.preGameRoomUser} (game_table_id, user_id) VALUES ($1, $2);
        `,
            [gameTableID, myUserID]
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    res.json({ message: "join table success" });

    io.to(`chatroom-${targetChatroomID}`).emit("update_pre_game_card", { targetChatroomID });
}

async function quitTable(req: Request, res: Response) {
    logger.debug("quit table");
    const targetChatroomID = req.body.chatroom_id;

    try {
        const gameTableID = req.body.gameTableID;
        const myUserID = req.body.myUserID;
        await client.query(/*sql*/ `DELETE from ${tables.preGameRoomUser} WHERE game_table_id = $1 AND user_id = $2;`, [
            gameTableID,
            myUserID,
        ]);
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    res.json({ message: "quit table success" });
    io.to(`chatroom-${targetChatroomID}`).emit("update_pre_game_card", { targetChatroomID });
}

async function addNewTable(req: Request, res: Response) {
    logger.debug("add new table");
    const targetChatroomID = req.body.chatroom_id;
    logger.debug(targetChatroomID);

    try {
        await client.query(
            /*sql*/ `
        INSERT INTO ${tables.preGameRoomData} (chatroom_id, game_type, game_status) VALUES ($1, $2, $3);
        `,
            [targetChatroomID, 0, "waiting join"]
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    res.json({ message: "add table success" });

    io.to(`chatroom-${targetChatroomID}`).emit("update_pre_game_card", { targetChatroomID });
}

async function deleteTable(req: Request, res: Response) {
    logger.debug("delete table");
    const targetChatroomID = req.body.chatroom_id;

    try {
        const gameTableID = req.body.gameTableID;

        const queryResult = await client.query(
            /*sql*/ `SELECT * FROM ${tables.preGameRoomData} WHERE game_table_id = $1 AND game_status = $2;`,
            [gameTableID, "waiting join"]
        );

        if (queryResult.rows.length > 0) {
            // const game_status = (queryResult).rows[0].game_status;
            // console.log(game_status);
            await client.query(/*sql*/ `DELETE from ${tables.preGameRoomUser} WHERE game_table_id = $1;`, [
                gameTableID,
            ]);
            await client.query(/*sql*/ `DELETE from ${tables.preGameRoomData} WHERE game_table_id = $1;`, [
                gameTableID,
            ]);
        } else {
            throw "not rooms can be delete";
        }
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    res.json({ message: "delete table success" });
    io.to(`chatroom-${targetChatroomID}`).emit("update_pre_game_card", { targetChatroomID });
}

async function changeTableType(req: Request, res: Response) {
    logger.debug("change table type");
    const targetChatroomID = req.body.chatroom_id;
    const gameTableID = req.body.gameTableID;
    const gameType = req.body.gameType;

    try {
        await client.query(
            /*sql*/ `
            UPDATE ${tables.preGameRoomData} SET game_type = $1 where game_table_id = $2 AND game_status = $3;
        `,
            [gameType, gameTableID, "waiting join"]
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    res.json({ message: "change table type success" });

    io.to(`chatroom-${targetChatroomID}`).emit("update_pre_game_card", { targetChatroomID });
}

async function playGame(req: Request, res: Response) {
    logger.debug("play game");

    let myResult = {};

    try {
        const gameTableID = req.body.gameTableID;
        const queryResult = await client.query(
            /*sql*/ `select * from ${tables.preGameRoomData} where game_table_id = $1;`,
            [gameTableID]
        );
        const gameType = queryResult.rows[0].game_type;
        const gameStatus = queryResult.rows[0].game_status;
        const tempQueryResult = await client.query(
            /*sql*/ `
                SELECT ${tables.preGameRoomUser}.user_id,
                    ${tables.userData}.nickname
                FROM ${tables.preGameRoomUser}
                    INNER JOIN ${tables.userData} ON ${tables.preGameRoomUser}.user_id = ${tables.userData}.user_id
                WHERE game_table_id = $1
                ORDER BY nickname
            `,
            [gameTableID]
        );
        const user_id_obj = tempQueryResult.rows;
        myResult[gameTableID] = { user_id_obj, gameType, gameStatus };

        logger.debug(JSON.stringify(myResult));
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    res.json({ data: myResult });
}

async function logout(req:Request,res:Response){
    logger.debug(`${req.session["user_name"]} logout`)
    if(req.session){
        console.log("hi")
        delete req.session['user_name'];
        res.json("message: logouted")
    }else{
        res.status(500).json({ message: "Internal Server Error" });

    }
}