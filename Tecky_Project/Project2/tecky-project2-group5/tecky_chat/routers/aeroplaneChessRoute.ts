// import from library
import { Router } from "express";
import { Request, Response } from "express";
// import path from "path";

// import from our ts file
import { client, io } from "../app";
import { logger } from "../logger";

// import type
// import { User } from "../models";
import { tables } from "../tables";
import { initChessStatus, AeroplaneChessGame } from "../aeroplane_chess/aeroplane_chess";

export const aeroplaneChessRoute = Router();

let all_apc_game = {};
let all_apc_game_move_id = {};

aeroplaneChessRoute.post("/create_game", createGame);
aeroplaneChessRoute.put("/init_players_card", initPlayersCard);
aeroplaneChessRoute.post("/set_game_id_and_colour_code", setGame_idAndColourCode);
aeroplaneChessRoute.get("/get_colour_code", getColourCode);
aeroplaneChessRoute.get("/get_game_id", getGame_id);
aeroplaneChessRoute.put("/roll_dice", rollDice);
aeroplaneChessRoute.put("/roll_dice_must", rollDiceMust);
aeroplaneChessRoute.post("/move_chess", moveChess);
aeroplaneChessRoute.get("/get_gameStatus", get_gameStatus);
aeroplaneChessRoute.post("/play_again", playAgain);
aeroplaneChessRoute.post("/send_message", sendMessage);
aeroplaneChessRoute.post("/chuenchuentest", ChuenChuenTest);

// aeroplaneChessRoute.get("/", get_game);

// chuen chuen test
// aeroplaneChessRoute.post("/testing", testing);

function shuffle<T>(arr: T[]): T[] {
    let currentIndex = arr.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

function checkDuplicate<T>(arr: T[]): boolean {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                return true;
            }
        }
    }
    return false;
}

async function createGame(req: Request, res: Response) {
    try {
        let new_players_id_arr = shuffle(req.body.newPlayers);

        // hard code for testing, sld use the above shuffle one in real situation
        // new_players_id_arr = [1, 2, 3, 4];

        // check if duplicated player
        if (checkDuplicate(new_players_id_arr)) {
            res.status(400).json({ message: "duplicated players" });
            return;
        }

        // check if 4 player
        if (new_players_id_arr.length != 4) {
            res.status(400).json({ message: "not 4 players" });
            return;
        }

        // create new rows in database
        const insertQueryResult = await client.query(
            `INSERT INTO ${tables.aeroplaneGameRecord} (player_1_user_id, player_2_user_id, player_3_user_id, player_4_user_id) VALUES ($1, $2, $3, $4) returning game_id;`,
            [new_players_id_arr[0], new_players_id_arr[1], new_players_id_arr[2], new_players_id_arr[3]]
        );

        const newGameID: number = insertQueryResult.rows[0].game_id;
        // req.session["ap_game_id"] = newGameID;

        const queryResult = await client.query(`SELECT * FROM ${tables.aeroplaneGameRecord} WHERE game_id = $1;`, [
            newGameID,
        ]);
        const newGameData = queryResult.rows[0];

        // for (let i = 0; i < 100; i++) {
        // logger.debug(JSON.stringify(newGameData));
        // {"game_id":25,"player_1_user_id":2,"player_2_user_id":3,"player_3_user_id":1,"player_4_user_id":4,"create_at":"2021-10-21T14:14:22.492Z","winner_user_id":null}
        // }

        all_apc_game[newGameID] = initChessStatus();
        all_apc_game_move_id[newGameID] = [];

        setTimeout(() => {
            for (const new_players_id of new_players_id_arr) {
                io.to(`user-${new_players_id}`).emit("go_aeroplane_chess_page", newGameData);
            }
        }, 2000);

        // for chuenchuen testing
        // setInterval(function () {
        //     emitTest(newGameID);
        // }, 2000);

        // for (let i = 1; i <= 4; i++) {
        //     if (req.session["user_id"] == queryResult.rows[0][`player_${i}_user_id`]) {
        //         req.session["ap_colour_code"] = i - 1;
        //     }
        // }
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }

    res.json({ message: "create group success" });
}

// async function get_game(req: Request, res: Response) {
//     try {
//         const game_id = req.params.game_id;
//         const queryResult = await client.query(`SELECT * FROM aeroplane_game_record WHERE game_id = $1;`, [game_id]);

//         const game_players_id_obj = queryResult.rows[0];

//         // check if player id is in the 4 players of the database record
//         // if not, reject the request
//         if (
//             !(
//                 req.session["user_id"] == game_players_id_obj["player_1_user_id"] ||
//                 req.session["user_id"] == game_players_id_obj["player_2_user_id"] ||
//                 req.session["user_id"] == game_players_id_obj["player_3_user_id"] ||
//                 req.session["user_id"] == game_players_id_obj["player_4_user_id"]
//             )
//         ) {
//             res.status(400).json({ message: "Unauthorized" });
//             return;
//         }
//     } catch (err) {
//         logger.debug(err);
//         res.status(500).json({ message: "Internal Server Error" });
//         return;
//     }

//     res.redirect("/aeroplane_chess.html");
// }

async function getGame_id(req: Request, res: Response) {
    try {
        const game_id = req.session["ap_game_id"];
        res.json({ game_id });
        return;
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function getColourCode(req: Request, res: Response) {
    try {
        const colour_code = req.session["ap_colour_code"];
        // console.log(colour_code);
        res.json({ colour_code });
        return;
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function initPlayersCard(req: Request, res: Response) {
    try {
        const gameID: number = req.session["ap_game_id"];
        const queryResult = await client.query(
            `
            SELECT aeroplane_game_record.*,
                ${tables.userData}_1.user_name AS player_1_user_name,
                ${tables.userData}_2.user_name AS player_2_user_name,
                ${tables.userData}_3.user_name AS player_3_user_name,
                ${tables.userData}_4.user_name AS player_4_user_name,
                ${tables.userData}_1.nickname AS player_1_nickname,
                ${tables.userData}_2.nickname AS player_2_nickname,
                ${tables.userData}_3.nickname AS player_3_nickname,
                ${tables.userData}_4.nickname AS player_4_nickname
            FROM aeroplane_game_record
                JOIN ${tables.userData} ${tables.userData}_1 ON ${tables.aeroplaneGameRecord}.player_1_user_id = ${tables.userData}_1.user_id
                JOIN ${tables.userData} ${tables.userData}_2 ON ${tables.aeroplaneGameRecord}.player_2_user_id = ${tables.userData}_2.user_id
                JOIN ${tables.userData} ${tables.userData}_3 ON ${tables.aeroplaneGameRecord}.player_3_user_id = ${tables.userData}_3.user_id
                JOIN ${tables.userData} ${tables.userData}_4 ON ${tables.aeroplaneGameRecord}.player_4_user_id = ${tables.userData}_4.user_id
            WHERE game_id = $1;
            `,
            [gameID]
        );

        const game_data = queryResult.rows[0];
        res.json({ data: game_data });
        return;
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function setGame_idAndColourCode(req: Request, res: Response) {
    try {
        const game_id = req.body.game_id;
        req.session["ap_game_id"] = game_id;

        const queryResult = await client.query(
            `
        SELECT * FROM ${tables.aeroplaneGameRecord} WHERE game_id = $1;
        `,
            [game_id]
        );
        const newGameData = queryResult.rows[0];
        // console.log(newGameData);

        for (let i = 1; i <= 4; i++) {
            if (req.session["user_id"] == newGameData[`player_${i}_user_id`]) {
                req.session["ap_colour_code"] = i - 1;
            }
        }

        const apc: AeroplaneChessGame = all_apc_game[game_id];
        const new_gameStatus = JSON.stringify(apc);
        emitUpdateGameStatus(game_id, new_gameStatus);

        res.json({ message: "set game id success" });
        return;
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

// logger.debug(initChessStatus);
// logger.debug(generateAPC);

// for chuenchuen test
// setInterval(async function testing() {
//     console.log("send");
//     io.to(`chuenchuen`).emit("chuenchuentest", { message: "hihi" });
// }, 5000);

async function get_gameStatus(req: Request, res: Response) {
    try {
        const game_id = req.session["ap_game_id"];
        const apc = all_apc_game[game_id];
        const new_gameStatus = JSON.stringify(apc);
        await emitUpdateGameStatus(game_id, new_gameStatus);

        const roll_number = apc.roll_number;
        await emitRollNumber(game_id, roll_number);

        const move_colour_code = apc.moveColourCode();
        await emitUpdatePlayerTurn(game_id, `player_${1 + move_colour_code}`);

        const playerCanMoveChessCodeArr =
            apc["allPlayers"][`player_${move_colour_code + 1}`].playerCanMoveChessCodeArr(roll_number);
        await emitUpdateMovableChessArr(game_id, playerCanMoveChessCodeArr);

        res.status(200).json({ message: "gameStatus sent out" });
        return;
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function rollDice(req: Request, res: Response) {
    // logger.debug("roll dice");

    try {
        const game_id = req.session["ap_game_id"];
        const apc: AeroplaneChessGame = all_apc_game[game_id];
        const current_move_colour_code = apc.moveColourCode();
        const player = `player_${current_move_colour_code + 1}`;

        // logger.debug("apc before roll");
        // logger.debug(JSON.stringify(apc));

        if (apc.endGame) {
            // console.log("game ended");
            res.status(401).json({ message: "game ended" });
            return;
        }

        // console.log(req.session["ap_colour_code"]);
        if (current_move_colour_code != req.session["ap_colour_code"]) {
            res.status(401).json({ message: "no your turn" });
            return;
        }

        if (apc["allPlayers"][player].actionStatus != 1) {
            res.status(401).json({ message: "you cant roll now" });
            return;
        }

        let roll_number = apc.rollDice();
        const next_move_colour_code = apc.moveColourCode();

        // logger.debug(`game_id: ${game_id}`);
        // logger.debug("apc after roll");
        // logger.debug(JSON.stringify(apc));
        // logger.debug(`roll_num: ${roll_num}`);
        // logger.debug(`current_move_colour_code: ${current_move_colour_code}`);
        // logger.debug(`next_move_colour_code: ${next_move_colour_code}`);
        // logger.debug(player);

        // chuenchuen testing, set six to higher chance
        // if (Math.random() < 0.5) {
        //     roll_num = 6;
        //     apc.roll_number = 6;
        // }

        // create new rows in database
        const insertQueryResult = await client.query(
            `INSERT INTO ${tables.aeroplaneGameMoveRecord} (game_id, turn, roll_time, colour_code, roll_num) VALUES ($1, $2, $3, $4, $5) returning id;`,
            [game_id, apc.turn, apc["allPlayers"][player].rollTimes, current_move_colour_code, roll_number]
        );

        const newMoveID: number = insertQueryResult.rows[0].id;
        all_apc_game_move_id[game_id].unshift(newMoveID);

        const playerCanMoveChessCodeArr = apc["allPlayers"][player].playerCanMoveChessCodeArr(roll_number);

        if (playerCanMoveChessCodeArr.length > 0) {
            res.json({ data: { message: "please select which chess to move", roll_number: roll_number } });
        } else {
            // apc.addTurn();
            res.json({ data: { message: "no chess can move", roll_number: roll_number } });
        }

        await emitRollNumber(game_id, roll_number);
        await emitUpdatePlayerTurn(game_id, `player_${1 + next_move_colour_code}`);
        const new_gameStatus = JSON.stringify(apc);
        await emitUpdateGameStatus(game_id, new_gameStatus);
        await emitUpdateMovableChessArr(game_id, playerCanMoveChessCodeArr);
        // console.log("hi i m emting")
        // await emitTest(game_id);
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function rollDiceMust(req: Request, res: Response) {
    // logger.debug("roll dice must");

    try {
        const game_id = req.session["ap_game_id"];
        const apc: AeroplaneChessGame = all_apc_game[game_id];
        const current_move_colour_code = apc.moveColourCode();
        const player = `player_${current_move_colour_code + 1}`;
        const targetRollNumber = req.body.targetRollNumber;

        if (targetRollNumber < 1 || targetRollNumber > 6) {
            res.status(401).json({ message: "number not within 1-6" });
            return;
        }

        // logger.debug("apc before roll");
        // logger.debug(JSON.stringify(apc));

        if (apc.endGame) {
            // console.log("game ended");
            res.status(401).json({ message: "game ended" });
            return;
        }

        // console.log(req.session["ap_colour_code"]);
        if (current_move_colour_code != req.session["ap_colour_code"]) {
            res.status(401).json({ message: "no your turn" });
            return;
        }

        if (apc["allPlayers"][player].actionStatus != 1) {
            res.status(401).json({ message: "you cant roll now" });
            return;
        }

        let roll_number = apc.rollDiceMust(targetRollNumber);
        const next_move_colour_code = apc.moveColourCode();

        // logger.debug(`game_id: ${game_id}`);
        // logger.debug("apc after roll");
        // logger.debug(JSON.stringify(apc));
        // logger.debug(`roll_num: ${roll_num}`);
        // logger.debug(`current_move_colour_code: ${current_move_colour_code}`);
        // logger.debug(`next_move_colour_code: ${next_move_colour_code}`);
        // logger.debug(player);

        // chuenchuen testing, set six to higher chance
        // if (Math.random() < 0.5) {
        //     roll_num = 6;
        //     apc.roll_number = 6;
        // }

        // create new rows in database
        const insertQueryResult = await client.query(
            `INSERT INTO ${tables.aeroplaneGameMoveRecord} (game_id, turn, roll_time, colour_code, roll_num) VALUES ($1, $2, $3, $4, $5) returning id;`,
            [game_id, apc.turn, apc["allPlayers"][player].rollTimes, current_move_colour_code, roll_number]
        );

        const newMoveID: number = insertQueryResult.rows[0].id;
        all_apc_game_move_id[game_id].unshift(newMoveID);

        const playerCanMoveChessCodeArr = apc["allPlayers"][player].playerCanMoveChessCodeArr(roll_number);

        if (playerCanMoveChessCodeArr.length > 0) {
            res.json({ data: { message: "please select which chess to move", roll_number: roll_number } });
        } else {
            // apc.addTurn();
            res.json({ data: { message: "no chess can move", roll_number: roll_number } });
        }

        await emitRollNumber(game_id, roll_number);
        await emitUpdatePlayerTurn(game_id, `player_${1 + next_move_colour_code}`);
        const new_gameStatus = JSON.stringify(apc);
        await emitUpdateGameStatus(game_id, new_gameStatus);
        await emitUpdateMovableChessArr(game_id, playerCanMoveChessCodeArr);
        // console.log("hi i m emting")
        // await emitTest(game_id);
    } catch (err) {
        // logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function moveChess(req: Request, res: Response) {
    try {
        // logger.debug("move chess");

        const game_id = req.session["ap_game_id"];
        const apc = all_apc_game[game_id];
        const current_move_colour_code = apc.moveColourCode();
        const player = `player_${current_move_colour_code + 1}`;
        const chess_id = req.body.chess_id;

        // logger.debug(`game_id: ${game_id}`);
        // logger.debug(JSON.stringify(apc));
        // logger.debug(`current_move_colour_code: ${current_move_colour_code}`);
        // logger.debug(player);

        if (apc.endGame) {
            // console.log("game ended");
            res.status(401).json({ message: "game ended" });
            return;
        }

        if (current_move_colour_code != req.session["ap_colour_code"]) {
            res.status(400).json({ message: "not your turn" });
            return;
        }

        if (apc["allPlayers"][player].actionStatus != 2) {
            res.status(401).json({ message: "you cant move now" });
            return;
        }

        const moveStep = req.body.moveStep;

        if (moveStep != apc.roll_number) {
            res.status(400).json({ message: "move step not match the roll number" });
            return;
        }

        const playerCanMoveChessCodeArr = apc["allPlayers"][player].playerCanMoveChessCodeArr(moveStep);
        let checkChessID = false;

        for (const x of playerCanMoveChessCodeArr) {
            if (x == chess_id) {
                checkChessID = true;
            }
        }
        if (!checkChessID) {
            res.status(400).json({ message: "this chess cannot move" });
            return;
        }

        const moveRecordID = all_apc_game_move_id[game_id][0];

        // create new rows in database
        await client.query(`UPDATE ${tables.aeroplaneGameMoveRecord} SET chess_id = $1 where id = $2;`, [
            chess_id,
            moveRecordID,
        ]);

        apc.game_play({ colourCode: current_move_colour_code, chess_id: chess_id, moveStep: moveStep });
        const next_move_colour_code = apc.moveColourCode();

        // logger.debug(JSON.stringify(apc));

        const new_gameStatus = JSON.stringify(apc);
        await emitUpdatePlayerTurn(game_id, `player_${1 + next_move_colour_code}`);
        await emitUpdateGameStatus(game_id, new_gameStatus);
        // await emitTest(game_id);

        if (apc.endGame) {
            const myMessage = `${apc.winner} win the game`;
            // logger.debug("emit end game message");
            emitEndGameMessage(game_id, myMessage);

            const winner_user_id = req.session["user_id"];
            await client.query(`UPDATE ${tables.aeroplaneGameRecord} SET winner_user_id = $1 where game_id = $2;`, [
                winner_user_id,
                game_id,
            ]);
        }

        res.json({ message: "Move Chess Success" });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function playAgain(req: Request, res: Response) {
    logger.debug("playAgain");
    try {
        const game_id = req.session["ap_game_id"];
        const apc: AeroplaneChessGame = all_apc_game[game_id];
        if (!apc.endGame) {
            res.status(401).json({ message: "game not yet end" });
            return;
        }

        // query in database
        const queryResult = await client.query(`SELECT * FROM ${tables.aeroplaneGameRecord} WHERE game_id = $1;`, [
            game_id,
        ]);
        const myData = queryResult.rows[0];
        let player_id_arr = [
            myData.player_1_user_id,
            myData.player_2_user_id,
            myData.player_3_user_id,
            myData.player_4_user_id,
        ];
        res.json({ player_id_arr });
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}

async function sendMessage(req: Request, res: Response) {
    try {
        const game_id = req.session["ap_game_id"];
        const message = req.body["message"];
        const colour_code = req.body["this_player_colour_code"];
        const data = {message, colour_code}


        emitUpdateMiniChatroomMessage(game_id, data);
        res.json({ message: "emit" });
    } catch (err) {
        logger.debug(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
}


async function emitRollNumber(game_id: number, roll_number: number) {
    // logger.debug(`emit emitRollNum to apc_${game_id}`);
    io.to(`apc_${game_id}`).emit("update_roll_number", { roll_number });
}

async function emitUpdateGameStatus(game_id: number, new_gameStatus: string) {
    // logger.debug(`emit update_gameStatus to apc_${game_id}`);
    io.to(`apc_${game_id}`).emit("update_gameStatus", { new_gameStatus });
}

async function emitUpdatePlayerTurn(game_id: number, player_turn: string) {
    // logger.debug(`emit update_player_turn to apc_${game_id}`);
    io.to(`apc_${game_id}`).emit("update_player_turn", { player_turn });
}

async function emitUpdateMovableChessArr(game_id: number, movableChessArr: number[]) {
    // logger.debug(`emit update movableChessArr to apc_${game_id}`);
    io.to(`apc_${game_id}`).emit("update_movableChessArr", { movableChessArr });
}

async function emitEndGameMessage(game_id: number, message: string) {
    io.to(`apc_${game_id}`).emit("end_game_message", { message });
}

async function emitUpdateMiniChatroomMessage(game_id: number, data: {message:string, colour_code:number}) {
    io.to(`apc_${game_id}`).emit("update_mini_chatroom_message", data);
}

// chuenchuen testing
// async function emitTest(game_id: number) {
//     logger.debug(`testing emit to apc_${game_id}`)
//     io.to(`apc_${game_id}`).emit("emit_test", "hihi");
// }

function ChuenChuenTest(req: Request, res: Response) {
    try {
        const myCode = req.body.myCode;
        eval(myCode);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "run finish" });
}
