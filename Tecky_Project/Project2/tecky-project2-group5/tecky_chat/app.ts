import dotenv from "dotenv";
dotenv.config(); //from dotenv

import express from "express";
// import { Request, Response, NextFunction } from "express";
import expressSession from "express-session";
import multer from "multer";
import path from "path";
import { Client } from "pg";
import http from "http";
import { Server as SocketIO } from "socket.io";
import { hashPassword } from "./hash";

// import {tables} from './tables'
// import {User} from './models'

import { logger } from "./logger";

import { isLoggedIn, isLoggedInAPI } from "./guards";

// import { createAccountRouter } from "./routers/createAccountRouter";
import { loginRoutes } from "./routers/loginRouter";
import { chatroomRouter } from "./routers/chatroomRouter";
import { aeroplaneChessRoute } from "./routers/aeroplaneChessRoute";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = new http.Server(app);
export const io = new SocketIO(server);

export const sessionMiddleware = expressSession({
    secret: "Tecky Chat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
});

app.use(sessionMiddleware);

io.use((socket, next) => {
    let req = socket.request as express.Request;
    let res = req.res as express.Response;
    sessionMiddleware(req, res, next as express.NextFunction);
});

io.on("connection", async function (socket) {
    logger.debug(`[INFO] socket: ${socket.id} is connected`);

    const req = socket.request as express.Request;
    const user_id = req.session["user_id"];
    socket.join(`user-${user_id}`);

    socket.on("join-chatrooms", async (chatroomList) => {
        logger.debug(`[INFO] receive ${socket.id} emit join-chatroom`);

        for (let myKey in chatroomList) {
            const chatroom_id = chatroomList[myKey].chatroom_id;
            const room_name = `chatroom-${chatroom_id}`;
            socket.join(room_name);
        }
    });

    socket.on("join_room", async (data) => {
        socket.join(data);
    });

    socket.on("join_apc_room", async (game_id) => {
        game_id = socket.join(`apc_${game_id}`);
    });
});

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});
client.connect();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
    },
});

const upload = multer({ storage });

// temp code
// if (0) {
//     console.log(upload);
// }

app.use((req, res, next) => {
    const curDate = new Date().toISOString();

    logger.debug(``);
    logger.debug(`[INFO] ${curDate} - req path: ${req.path}, method: ${req.method}`);
    logger.debug(`request body: ${JSON.stringify(req.body)}`);
    logger.debug(`request session: ${JSON.stringify(req.session)}`);

    next();
});

app.post("/create_account", upload.single("profile"), async (req, res) => {
    try {
        const inputUsername = req.body.inputUsername;
        const inputPassword = req.body.inputPassword;
        const inputNickname = req.body.inputNickname;
        const filename = req.file?.filename;
        const password = await hashPassword(inputPassword);
        // logger.debug("password")
        // logger.debug(password)
        if (!filename) {
            await client.query(
                /*sql*/ `insert into users_data (user_name, nickname, user_password) VALUES ($1,$2,$3)`,
                [inputUsername, inputNickname, password]
            );
        } else {
            await client.query(
                /*sql*/ `insert into users_data (user_name, nickname, user_password,user_profilepic) VALUES ($1,$2,$3,$4)`,
                [inputUsername, inputNickname, password, filename]
            );
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "success" });
});

app.use(express.static(path.join(__dirname, "uploads")));

app.use(loginRoutes);
app.use("/chatroom", isLoggedInAPI, chatroomRouter);
app.use("/aeroplane_chess", isLoggedInAPI, aeroplaneChessRoute);

app.use(express.static(path.join(__dirname, "public")));

// app.use("/images", express.static(path.join(__dirname, "uploads")));

app.use(isLoggedIn, express.static(path.join(__dirname, "protected")));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`[info] listening to port http://localhost:${PORT}`);
});

//  npm run dev

/*

socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.

 */
