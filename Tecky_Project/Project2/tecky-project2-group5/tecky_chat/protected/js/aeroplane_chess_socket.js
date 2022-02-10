window.onload = async () => {
    await getUserData();
    await initSocket();
    await getColourCode();
    await initPlayersCard();
    await getGameStatus();
    // chuenStrategy();
};

let userid;
let userName;
let nickname;
let FE_roll_number = 1;
let this_player_colour_code;
let move_colour_code = 0;
let movableChessArr = [];
let FE_actionStatus = 0;
let autoPlayStatus = false;

const socket = io.connect();

async function initSocket() {
    try {
        const resp = await fetch("aeroplane_chess/get_game_id", { method: "get" });
        const game_id = (await resp.json()).game_id;
        console.log(game_id);
        socket.emit("join_apc_room", game_id);
    } catch (err) {
        console.log(err);
    }
}

async function getUserData() {
    const resp = await fetch("/chatroom/getUserData", { method: "post" });
    userdata = (await resp.json()).data;
    userid = userdata.userId;
    userName = userdata.userName;
    nickname = userdata.nickname;
    user_profilepic = userdata.user_profilepic;
}

async function getColourCode() {
    try {
        const resp = await fetch("aeroplane_chess/get_colour_code", { method: "get" });
        this_player_colour_code = (await resp.json()).colour_code;
    } catch (err) {
        console.log(err);
    }
}

async function initPlayersCard() {
    players_card = {
        player1_card: document.getElementById("player1-card"),
        player2_card: document.getElementById("player2-card"),
        player3_card: document.getElementById("player3-card"),
        player4_card: document.getElementById("player4-card"),

        player1_card_nickname: document.getElementById("player1-nickname"),
        player2_card_nickname: document.getElementById("player2-nickname"),
        player3_card_nickname: document.getElementById("player3-nickname"),
        player4_card_nickname: document.getElementById("player4-nickname"),
    };

    const resp = await fetch("/aeroplane_chess/init_players_card", {
        method: "PUT",
        body: {},
    });

    if (resp.status === 200) {
        const gameData = (await resp.json()).data;
        for (let i = 1; i <= 4; i++) {
            players_card[`player${i}_card_nickname`].innerHTML = gameData[`player_${i}_nickname`];

            if (this_player_colour_code == i - 1) {
                players_card[`player${i}_card`].classList.add(`myself-${this_player_colour_code}`);
            }
        }

        let myImage = [];
        myImage.push(document.querySelector(`#player1-profile-pic`));
        myImage.push(document.querySelector(`#player2-profile-pic`));
        myImage.push(document.querySelector(`#player3-profile-pic`));
        myImage.push(document.querySelector(`#player4-profile-pic`));

        try {
            for (let i = 0; i <= myImage.length; i++) {
                const playerNickname = gameData[`player_${i+ 1}_nickname`];
                myImage[i].innerHTML = `
                <img src="/${playerNickname}.png" alt="" class="profile-pic" />
                `;
            }
        } catch (err) {
            return;
        }
    }
}

async function roll_dice() {
    // fetch -> HTTP Request (Method: GET + Path: /memos)
    const resp = await fetch("/aeroplane_chess/roll_dice", {
        // headers: { "Content-Type": "application/json" },
        method: "PUT",
        // body: {},
    });
    if (resp.status === 200) {
        // note from chuenchuen
        // i delete all the response logic
        // becuase the logic will done by socket
        //
        // some code to determine the move and pass
        // FE_roll_num = (await resp.json()).roll_num;
        // console.log((await resp.json()).message);
    } else {
        console.log((await resp.json()).message);
        return;
    }
}

async function roll_dice_must(targetRollNumber) {
    // fetch -> HTTP Request (Method: GET + Path: /memos)

    const myBody = JSON.stringify({ targetRollNumber });
    const resp = await fetch("/aeroplane_chess/roll_dice_must", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: myBody,
    });
    if (resp.status === 200) {
        // note from chuenchuen
        // i delete all the response logic
        // becuase the logic will done by socket
        //
        // some code to determine the move and pass
        // FE_roll_num = (await resp.json()).roll_num;
        // console.log((await resp.json()).message);
    } else {
        console.log((await resp.json()).message);
        return;
    }
}

async function ChuenChuenTest(myCode) {
    const myBody = JSON.stringify({ myCode });
    const resp = await fetch("/aeroplane_chess/chuenchuentest", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
    if (resp.status === 200) {
        console.log((await resp.json()).message);
    } else {
        console.log((await resp.json()).message);
        return;
    }
}

// note from chuenchuen
// i delete all the response logic
// becuase the logic will done by socket
async function moveChess(chess_id, moveStep) {
    const myBody = JSON.stringify({ chess_id, moveStep });
    const resp = await fetch("/aeroplane_chess/move_chess", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
}

socket.on("update_roll_number", async (data) => {
    // console.log(data);
    // console.log(data.roll_number);
    FE_roll_number = await data.roll_number;
    let myColour = colour_def[move_colour_code];
    let myIcon;
    switch (FE_roll_number) {
        case 1: {
            myIcon = `<i class="fas fa-dice-one"></i>`;
            break;
        }
        case 2: {
            myIcon = `<i class="fas fa-dice-two"></i>`;
            break;
        }
        case 3: {
            myIcon = `<i class="fas fa-dice-three"></i>`;
            break;
        }
        case 4: {
            myIcon = `<i class="fas fa-dice-four"></i>`;
            break;
        }
        case 5: {
            myIcon = `<i class="fas fa-dice-five"></i>`;
            break;
        }
        case 6: {
            myIcon = `<i class="fas fa-dice-six"></i>`;
            break;
        }
        default: {
            myIcon = `<i class="fas fa-dice-one"></i>`;
            break;
        }
    }
    const roll_num_disp = document.querySelector("#roll_num_disp");
    roll_num_disp.innerHTML = myIcon;
    roll_num_disp.style.color = myColour;
});

socket.on("update_player_turn", async (data) => {
    const player_turn = await data.player_turn;
    move_colour_code = parseInt(data.player_turn.replace("player_", "")) - 1;
    document.querySelector("#player_turn_disp").innerHTML = player_turn;

    const roll_btn = document.querySelector("#roll-btn");

    for (let myClass of roll_btn.classList) {
        if (myClass != "btn" && myClass != "my-btn-font-size") {
            roll_btn.classList.remove(myClass);
        }
    }

    let myNewClass = "";

    switch (move_colour_code) {
        case 0: {
            myNewClass = "btn-primary";
            break;
        }
        case 1: {
            myNewClass = "btn-success";
            break;
        }
        case 2: {
            myNewClass = "btn-danger";
            break;
        }
        case 3: {
            myNewClass = "btn-warning";
            break;
        }
    }
    roll_btn.classList.add(myNewClass);

    const leftMidCard = document.querySelector("#left-mid-card");
    for (let myClass of leftMidCard.classList) {
        if (myClass == "myself-0" || myClass == "myself-1" || myClass == "myself-2" || myClass == "myself-3") {
            leftMidCard.classList.remove(myClass);
        }
    }
    if (this_player_colour_code == move_colour_code) {
        leftMidCard.classList.add(`myself-${move_colour_code}`);
    }
});

socket.on("update_gameStatus", async (data) => {
    FE_gameStatus = await JSON.parse(data.new_gameStatus);
    allClickableChess.updatePostion(FE_gameStatus);
    update_FE_actionStatus();
    update_movingChessArr();
    update_turnDisp();
    update_player_chess_btn_obj();
    // console.log(FE_gameStatus);

    try {
        if (autoPlayStatus) {
            setTimeout(function () {
                if (move_colour_code == this_player_colour_code) {
                    if (FE_actionStatus == 1) {
                        roll_dice();
                        return;
                    }
                    if (FE_actionStatus == 2) {
                        if (typeof autoPlay == "function") {
                            autoChosenChess_id = autoPlay(FE_gameStatus, this_player_colour_code, movableChessArr);
                            moveChess(autoChosenChess_id, FE_roll_number);
                            return;
                        }
                    }
                }
            }, 200);
        }
    } catch (err) {
        return;
    }
});

// socket.on("emit_test", async (data) => {
//     console.log(data);
// });

socket.on("update_movableChessArr", async (data) => {
    // console.log(data);
    try {
        movableChessArr = await data.movableChessArr;
        // console.log(movableChessArr);
    } catch (err) {
        movableChessArr = [];
        console.log(movableChessArr);
    }
});

socket.on("end_game_message", async (data) => {
    console.log("end game");
    // console.log(data);
    const myMessage = await data.message;
    console.log(myMessage);

    document.querySelector("#win-message").innerHTML = myMessage;
    document.querySelector("#win-game-card").style.display = "flex";

    // if (userName == "chuen") {
    //     setTimeout(function () {
    //         playAgain();
    //     }, 2000);
    // }
});

async function getGameStatus() {
    try {
        const resp = await fetch("aeroplane_chess/get_gameStatus", { method: "get" });
    } catch (err) {
        console.log(err);
    }
}

function update_FE_actionStatus() {
    const myActionStatus = FE_gameStatus.allPlayers[`player_${this_player_colour_code + 1}`].actionStatus;
    FE_actionStatus = myActionStatus;
}

function update_movingChessArr() {
    const animationArr = FE_gameStatus.animationArr;
    if (animationArr.length > 0) {
        try {
            for (let data of animationArr) {
                movingChessArr.push(new MovingChess(data, animationRate, scaleFactor));
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}

function update_turnDisp() {
    document.querySelector("#turn_disp span").innerHTML = FE_gameStatus.turn;
}

async function playAgain() {
    const myBody = JSON.stringify({});
    const resp = await fetch("/aeroplane_chess/play_again", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
    if (resp.status === 200) {
        const player_id_arr = (await resp.json()).player_id_arr;
        console.log(player_id_arr);
        createAeroplaneChess(player_id_arr);
        return;
    } else {
        console.log((await resp.json()).message);
        return;
    }
}

async function createAeroplaneChess(newPlayers) {
    const resp = await fetch("/aeroplane_chess/create_game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPlayers }),
    });

    if (resp.status === 200) {
        console.log("create a new apc");
        // window.location = "/aeroplane_chess.html";
    } else {
        const message = (await resp.json()).message;
        console.log(message);
    }
}

socket.on("go_aeroplane_chess_page", async (newGameData) => {
    try {
        const game_id = newGameData.game_id;
        const myBody = JSON.stringify({ game_id });

        const resp = await fetch("/aeroplane_chess/set_game_id_and_colour_code", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: myBody,
        });

        window.location = "/aeroplane_chess.html";
    } catch (err) {
        console.log(err.message);
    }
});

/* 
// 1st draft
// bot for chuenchuen auto testing
// random bot
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

setInterval(function () {
    if (move_colour_code == this_player_colour_code) {
        if (Math.random() < 0.5) {
            roll_dice();
        } else {
            moveChess(randomIntFromInterval(0, 3), FE_roll_num);
        }
    }
}, 250);
 */

/* 
// 2nd and 3rd draft
// bot for chuenchuen auto testing
// finish one chess strategy
setInterval(function () {
    if (move_colour_code == this_player_colour_code) {
        if (Math.random() < 0.5) {
            roll_dice();
        } else {
            // const movableChessArr = FE_gameStatus.allPlayers[`player_${this_player_colour_code + 1}`].chessStatus;
            // for (let myKey of movableChessArr) {
                // console.log(myKey)
                // if (movableChessArr[myKey].boardCode != 4) {
                //     if (movableChessArr[myKey].boardCode == 0 && FE_roll_num == 6) {
                //         moveChess(movableChessArr[myKey], FE_roll_num);
                //         return;
                //     } else if (
                //         movableChessArr[myKey].boardCode == 1 ||
                //         movableChessArr[myKey].boardCode == 2 ||
                //         movableChessArr[myKey].boardCode == 3
                //     ){
                //         moveChess(myKey, FE_roll_num);
                //         return;
                //     }
                // }
                moveChess(parseInt(movableChessArr[0]), FE_roll_number)
            }
        }
    }
, 500);
 */

/* 
// 4 th draft
// bot for chuenchuen auto testing
// finish one chess strategy
autoPlayStatus = true;
function autoPlay(my_gameStatus, my_colour_code, my_movableChessArr){
    myAutoChosenChess = parseInt(my_movableChessArr[0])
    return myAutoChosenChess;
}
 */

// for mini-chatroom
async function sendMessage(InputMessage) {
    const message = InputMessage.replace(/\n/g, " ");
    const myBody = JSON.stringify({ message, this_player_colour_code });
    const resp = await fetch("/aeroplane_chess/send_message", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
    if (resp.status === 200) {
        document.querySelector("#messageInput").value = "";
        return;
    } else {
        console.log((await resp.json()).message);
        return;
    }
}

socket.on("update_mini_chatroom_message", async (data) => {
    try {
        const message = data.message;
        const colour_code = data.colour_code;
        const myClass = `player${1 + colour_code}-message`;
        const messageContainer = document.querySelector("#message-container");
        messageContainer.innerHTML += `<div class=${myClass}>${message}</div>`;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    } catch (err) {
        console.log(err.message);
    }
});
// end of mini-chatroom
