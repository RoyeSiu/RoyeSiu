let chat_list = document.querySelector("#chat-list");
let message_container = document.querySelector("#message-container");
let addNewGroupButton = document.querySelector("#addNewGroup");
let newGroupNameInput = document.querySelector("#new-group-name");
let newGroupAddNewUserButton = document.querySelector("#new-group-add-new-user-button");
let newGroupNewUserInput = document.querySelector("#new-group-new-user-input");
let newUsersList = document.querySelector("#new-users-list");
let createGroupButton = document.querySelector("#create-group");
let sendMessage = document.querySelector("#sendText");
let messageInput = document.querySelector("#messageInput");
let gameTypeCard = document.querySelector("#game-type-card");
let openGameRoomBtn = document.querySelector("#open-game-room");

let crossPreGameCard = document.querySelector("#cross-pre-game-card");
let crossGameTypeCard = document.querySelector("#cross-game-type-card");
let apcCard = document.querySelector("#apc-card");
let search = document.querySelector("#search-input");
let searchReseultList = document.querySelector("#search-reseult-list");
let searchGetInput = document.querySelector("#searchGetInput");
let codingStatusSwitch = document.querySelector("#coding-status-switch");
let newUsernameArr = [];
let preGameCardArr = [];
let preGameTable = 1;

// let newGroupCard = document.querySelector("#new-group-card");

let preGameCard = document.querySelector("#pre-game-card");
let preGameCardMain = document.querySelector("#pre-game-card-main");

let userid;
let userName;
let nickname;
let currentChatroom_id;
let socket = null;
let isCode = false;
let chatroom_button_arr;
let chatroomid;



socket = io.connect();

window.onload = async () => {
    // checkcodingstatus()
    await loadChatroomList();
    // initPreGameCard();
    await getUserData();
    messageInput.innerText = "";
    // sendMessage.style.display = "none";
    setChatFrameWidth();
};

window.addEventListener('resize', setChatFrameWidth);


function setChatFrameWidth(){
    let chatFrame = document.querySelector("#chat-frame");
    let winInnerWidth = window.innerWidth;
    let rootDiv = document.querySelector("#root");
    let leftSideBar = document.querySelector("#left-side-bar")
    let mainChat = document.querySelector("#main-chat")

    if (winInnerWidth <768 ){
        chatFrame.style.width = "98vw";
        leftSideBar.style.height = "100vh";
        mainChat.style.height = "100vh";
        rootDiv.style.marginTop = 0;
    } else {
        chatFrame.style.width = "90vw";
        leftSideBar.style.height = "90vh";
        mainChat.style.height = "90vh";
        rootDiv.style.marginTop = "3vh";
        
    }

}

/*----------------Hide send message button-----------*/
// function hideSendMessageButton() {
messageInput.addEventListener("input", () => {
    // console.log(messageInput.innerHTML)
    if (messageInput.innerHTML != "") {
        sendMessage.style.display = "inline";
        return;
    } else {
        sendMessage.style.display = "none";
        return;
    }
});
// }

/************************************************* */

codingStatusSwitch.addEventListener("change", function (e) {
    isCode = codingStatusSwitch.checked;
    // console.log(isCode);
});

async function getUserData() {
    const resp = await fetch("/chatroom/getUserData", { method: "post" });
    userdata = (await resp.json()).data;
    userid = userdata.userId;
    userName = userdata.userName;
    nickname = userdata.nickname;
    chatroomid = userdata.selectchatroomid;
    user_profilepic = userdata.user_profilepic;


    if(user_profilepic != null){

        document.querySelector("#user-profile-pic").innerHTML = `<img src="/${user_profilepic}" alt="" srcset=""> <span>${nickname}</span>`

    } else{
        document.querySelector("#user-profile-pic").innerHTML = `<i id="user" class="far fa-user"></i>
        <span>${nickname}</span>`
    }
}

async function updateChatroomList() {
    // fetch -> HTTP Request (Method: GET + Path: /memos)
    const resp = await fetch("/chatroom/chatroomList", { method: "PUT" });
    const chatroomList = (await resp.json()).data;
    socket.emit("join-chatrooms", chatroomList);

    let myStr = "";
    for (let myKey in chatroomList) {
        const unread_msg = chatroomList[myKey]["unread_msg"];
        const chatroom_name = chatroomList[myKey]["chatroom_name"];
        const chatroom_id = chatroomList[myKey]["chatroom_id"];
        // myStr += `<div id="chatroom-${chatroom_id}" class="chatroom-button">${chatroom_name}</div>`;
        if (unread_msg > 99) {
            myStr += `
            <div id="chatroom-${chatroom_id}" class="chatroom-button new-group">
                <div class="chatroom-name">${chatroom_name}</div>
                <div class="unread ">99+</div>
            </div>
            `; 
            continue
        } else if(unread_msg > 0){
            myStr += `
        <div id="chatroom-${chatroom_id}" class="chatroom-button new-group">
            <div class="chatroom-name">${chatroom_name}</div>
            <div class="unread">${unread_msg}</div>
        </div>
        `;
        } else {myStr += `
        <div id="chatroom-${chatroom_id}" class="chatroom-button new-group">
            <div class="chatroom-name">${chatroom_name}</div>
            
        </div>
        `;}
    }
    chat_list.innerHTML = myStr;
    applyOnclickEventForChatroomList();
}

async function loadChatroomList() {
    await updateChatroomList();
    /*-------------------------功能重複-----------------------*/
    // await applyOnclickEventForChatroomList();
}
//join soctek
// socket = io.connect();
async function applyOnclickEventForChatroomList() {
    chatroom_button_arr = document.querySelectorAll(".chatroom-button");
    for (let chatroom_button of chatroom_button_arr) {
        chatroom_button.addEventListener("click", function () {
            const chatroom_id = parseInt(chatroom_button.id.replace("chatroom-", ""));
            select_chatroom_id(chatroom_id);
        });
    }
}

async function select_chatroom_id(chatroom_id) {
    currentChatroom_id = chatroom_id;
    message_container.innerHTML = "";
    searchReseultList.innerHTML = "";
    // fetch -> HTTP Request (Method: GET + Path: /memos)
    const myBody = JSON.stringify({ chatroom_id });
    const resp = await fetch("/chatroom/select_chatroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: myBody,
    });
    if (resp.status === 200) {
        await loadMessage();
        await updatePreGameCard(chatroom_id);
    }
    document.querySelector(`#chatroom-${chatroom_id}`).classList.add("selected-chatroom");
}

async function loadMessage() {
    // fetch -> HTTP Request (Method: GET + Path: /memos)
    const myBody = JSON.stringify({});
    // console.log(myBody);
    const resp = await fetch("/chatroom/get_message", {
        // const resp = await fetch("/get_message", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: myBody,
    });

    const messageObj = (await resp.json()).data;

    let isOwner = [];
    // console.log(messageObj);

    let myStr = "";
    for (let myKey in messageObj) {
        const isCode = messageObj[myKey]["is_code"];
        const message_content = messageObj[myKey]["message_content"].replace(/\\\\n/g, "\n");
        const nickname = messageObj[myKey]["nickname"];
        const owner = messageObj[myKey]["user_id"];
        if (userid == owner) {
            isOwner = "right";
        } else {
            isOwner = "left";
        }
        const created_at = messageObj[myKey]["created_at"];
        const myDate = new Date(created_at);
        const myTimeArr = myDate.toTimeString().split(" ")
        const formated_create_at = myTimeArr[0]

        const message_id = messageObj[myKey]["message_id"];
        if (isCode) {
            // myStr += `<div id="msg-${message_id}" class="${isOwner} "><div class="user">${nickname}</div><div class="msg-content "><pre class="code-block"><code >${message_content}</pre></code><div>${created_at}</div></div></div>`;

            myStr += `<div id="msg-${message_id}" class="${isOwner}"><div class="user">${nickname}</div>
            
            <div class="chat-bubble msg-content"><pre class="code-block"><code><div>${message_content}</div></pre></code><div class="timeformat">${formated_create_at}</div></div></div>`;

            // myStr += `<div id="msg-${message_id}" class="${isOwner} code-block"><div class="user">${nickname}</div><div class="msg-content "><pre><code>${message_content}</pre></code><span></span><div>${created_at}</div></div></div>`;
        } else {
            // myStr += `<div id="msg-${message_id}" class="${isOwner}><div class="user">${nickname}</div><div class="msg-content "><div>${message_content}</div><div>${created_at}</div></div></div>`;

            myStr += `<div id="msg-${message_id}" class="${isOwner}"><div class="user">${nickname}</div>
            
            <div class="chat-bubble"><div>${message_content}</div><div class="timeformat">${formated_create_at}</div></div></div>`;
            // document.querySelector("message_content").textContent=message_content
        }
    }

    message_container.innerHTML = myStr;

    for (let myKey in messageObj) {
        if (messageObj[myKey]["is_code"]) {
            const message_id = messageObj[myKey]["message_id"];
            const isCode = messageObj[myKey]["is_code"];
            try {
                const tempHTML = document.querySelector(`#msg-${message_id} .msg-content pre code`);
                hljs.highlightBlock(document.querySelector(`#msg-${message_id} .msg-content pre code`));
            } catch (err) {
                console.log(err);
            }
        }
    }
    message_container.scrollTop = message_container.scrollHeight;

}

search.addEventListener("click", async () => {
    const searchInput = searchGetInput.value;
    console.log("searchInput");
    console.log(searchInput);
    const myBody = JSON.stringify({ searchInput });
    const resp = await fetch("/chatroom/searchMessage", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
    if (resp.status === 200) {
        console.log("search success");
        searchGetInput.value = "";
    }
    let isOwner = [];
    // console.log(messageObj);

    let myStr = "";
    const messageResult = (await resp.json()).data;
    let searchlist = "";
    if (messageResult != 0) {
        for (let messageKey in messageResult) {
            const isCode = messageResult[messageKey]["is_code"];
            const message_content = messageResult[messageKey]["message_content"].replace(/\\\\n/g, "\n");
            const nickname = messageResult[messageKey]["nickname"];
            // const owner = messageResult[messageKey]["user_id"];
            // if (userid == owner) {
            //     isOwner = "right";
            // } else { isOwner = "left" }
            // const created_at = messageResult[messageKey]["created_at"];
            const message_id = messageResult[messageKey]["message_id"];
            if (isCode) {
                myStr += `<div id="serach-${message_id}"><a href="#msg-${message_id}"><div class="serach-user">${nickname}</div><div class="serach-content serach-chat-bubble"><pre class="code-block"><code >${message_content}</pre></code><span></span></div></div>`;
                // myStr += `<div id="msg-${message_id}" class="${isOwner} code-block"><div class="user">${nickname}</div><div class="msg-content "><pre><code>${message_content}</pre></code><span></span><div>${created_at}</div></div></div>`;
            } else {
                myStr += `<div id="serach-${message_id}"><a href="#msg-${message_id}"><div class="serach-user">${nickname}</div><div class="serach-content serach-chat-bubble"><div>${message_content}</div></div></div>`;
            }
        }
    } else {
        myStr = `<div id="serach-0"><div class="serach-content "><div>No search reseult</div></div></div>`;
    }
    searchReseultList.innerHTML = myStr;

    for (let messageKey in messageResult) {
        if (messageResult[messageKey]["is_code"]) {
            const message_id = messageResult[messageKey]["message_id"];
            const isCode = messageResult[messageKey]["is_code"];
            try {
                const tempHTML = document.querySelector(`#serach-${message_id} .serach-content pre code`);
                hljs.highlightBlock(document.querySelector(`#serach-${message_id} .serach-content pre code`));
            } catch (err) {
                console.log(err);
            }
        }
    }
});

addNewGroupButton.addEventListener("click", function () {
    const newGroupName = newGroupNameInput.value;
    // newGroupCard.style.display = "inline";
    newUsernameArr = [];
    newUsersList.innerHTML = "";
});

newGroupAddNewUserButton.addEventListener("click", function () {
    const newUsername = newUsernameArr.push(newGroupNewUserInput.value);
    newUsersList.innerHTML = "";
    for (let newUser of newUsernameArr) {
        newUsersList.innerHTML += `${newUser}<br>`;
    }
});

createGroupButton.addEventListener("click", async function (e) {
    console.log("hihihi");
    const newGroupName = newGroupNameInput.value;

    const myBody = JSON.stringify({ newGroupName, newUsernameArr });
    console.log(myBody);
    // method: POST, Path: "/memo", Request Body
    const resp = await fetch("/chatroom/create_new_group", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
    if (resp.status === 200) {
        await loadChatroomList();
    }
    // newGroupCard.style.display = "none";
    newUsernameArr = [];
    newUsersList.innerHTML = "";

    newGroupNameInput.value = "";
});

sendMessage.addEventListener("click", async function (e) {
    // console.log(messageInput.value)
    const messageInputValue = messageInput.innerText.replace(/\n/g, "\\\\n");
    // const messageInputValue = (messageInput.innerText);
    console.log(messageInputValue);
    // const isCode = false;
    const messageInputbody = JSON.stringify({ messageInputValue, isCode });
    console.log(messageInputbody);
    const resp = await fetch("/chatroom/send_message", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: messageInputbody,
    });
    if (resp.status === 200) {
        console.log("send_message");
        messageInput.innerText = "";
        sendMessage.style.display = "none";
        // await loadUnreadMsg()
    }
});

/*----------------------test unread message--------------*/
socket.on("refresh-unread-msg", async () => {
    try {
        await updateChatroomList();
        /*---------------測試highlight select chatroom-------*/
        document.querySelector(`#chatroom-${currentChatroom_id}`).classList.add("selected-chatroom");
    } catch (err) {
        console.log(err.message);
    }
});

socket.on("refresh-chatroom-list", async () => {
    try {
        await loadChatroomList();
    } catch (err) {
        console.log(err.message);
    }
});

socket.on("refresh-message", async () => {
    try {
        await loadMessage();
    } catch (err) {
        console.log(err.message);
    }
});

async function updatePreGameCard(chatroom_id) {
    preGameCardMain.innerHTML = "";
    preGameCardArr = [];
    const resp = await fetch("/chatroom/get_pre_game_room", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatroom_id }),
    });

    // res like this
    // {
    //     "data": {
    //       "1": [
    //         {
    //           "user_id": 1,
    //           "nickname": "chuen"
    //         },
    //         {
    //           "user_id": 4,
    //           "nickname": "chuen2"
    //         },
    //         {
    //           "user_id": 2,
    //           "nickname": "roye"
    //         },
    //         {
    //           "user_id": 3,
    //           "nickname": "tony"
    //         }
    //       ],
    //       "2": [
    //         {
    //           "user_id": 1,
    //           "nickname": "chuen"
    //         },
    //         {
    //           "user_id": 4,
    //           "nickname": "chuen2"
    //         },
    //         {
    //           "user_id": 2,
    //           "nickname": "roye"
    //         },
    //         {
    //           "user_id": 3,
    //           "nickname": "tony"
    //         }
    //       ],
    //       "3": [
    //         {
    //           "user_id": 1,
    //           "nickname": "chuen"
    //         },
    //         {
    //           "user_id": 4,
    //           "nickname": "chuen2"
    //         },
    //         {
    //           "user_id": 2,
    //           "nickname": "roye"
    //         },
    //         {
    //           "user_id": 3,
    //           "nickname": "tony"
    //         }
    //       ],
    //       "4": [
    //         {
    //           "user_id": 1,
    //           "nickname": "chuen"
    //         },
    //         {
    //           "user_id": 4,
    //           "nickname": "chuen2"
    //         },
    //         {
    //           "user_id": 2,
    //           "nickname": "roye"
    //         },
    //         {
    //           "user_id": 3,
    //           "nickname": "tony"
    //         }
    //       ],
    //       "5": [
    //         {
    //           "user_id": 1,
    //           "nickname": "chuen"
    //         },
    //         {
    //           "user_id": 4,
    //           "nickname": "chuen2"
    //         },
    //         {
    //           "user_id": 2,
    //           "nickname": "roye"
    //         },
    //         {
    //           "user_id": 3,
    //           "nickname": "tony"
    //         }
    //       ]
    //     }
    //   }

    if (resp.status === 200) {
        const myData = (await resp.json()).data;
        if (!myData) {
            return;
        } else {
            for (let gameTableID in myData) {
                const gameType = myData[gameTableID].gameType;
                preGameCardArr.push(new PreGameBoard(gameTableID, gameType));
                for (const myObj of myData[gameTableID].user_id_obj) {
                    const myNickname = myObj.nickname;
                    const myUserID = myObj.user_id;
                    joinGamePlayer(gameTableID, myUserID, myNickname);
                }
            }
        }
    } else {
        console.log(resp.message);
        return;
    }

    // preGameCardArr.push(new PreGameBoard(1));
}

// function createNewPreGame(newID) {
//     preGameCardMain.innerHTML += `
// <div id="pre-game-${newID}" class="col-4 py-5">
//     <div id="pre-game-${newID}-add" class="d-flex justify-content-around">
//         <i class="far fa-plus-square text-primary create-new-game-button"></i>
//     </div>
//     <div class="d-flex justify-content-around">
//         <button id="pre-game-${newID}-join" type="button" class="btn btn-primary px-4">Join</button>
//         <button id="pre-game-${newID}-quit" type="button" class="btn btn-primary px-4">Quit</button>
//     </div>
//     <div id="pre-game-${newID}-players" class="mx-4">
//     </div>
// </div>
// `;
//     document.querySelector(`#pre-game-${newID}-add`).addEventListener("click", (e) => {
//         createNewPreGame(newID + 1);
//     });
//     document.querySelector(`#pre-game-${newID}-join`).addEventListener("click", (e) => {
//         document.querySelector(
//             `#pre-game-${newID}-players`
//         ).innerHTML = `<div id="pre-game-p-${userid}" class="btn btn-outline-secondary w-100 my-1 py-1">${nickname}</div>`;
//     });
//     document.querySelector(`#pre-game-${newID}-quit`).addEventListener("click", (e) => {
//         document.querySelector(`#pre-game-p-${userid}`).remove();
//     });
//     return;
// }

class PreGameBoard {
    constructor(newID, gameType) {
        this.newID = newID;
        this.gameType = gameType;

        preGameCardMain.innerHTML += `
        <div id="pre-game-${this.newID}" class="col py-5">
            <div class="d-flex justify-content-around">
                <div class="position-relative">
                    <div id="pre-game-${this.newID}-add" onclick="addGame(${this.newID})">
                        ${getTableTypeHTML(this.gameType)}
                    </div>
                    <div class="trash-button bg-primary" onclick="deleteTable(${currentChatroom_id}, ${
            this.newID
        }, ${userid})" data-toggle="tooltip" data-placement="top" title="Delete this table">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-around">
                <button id="pre-game-${this.newID}-join" onclick="joinGame(${currentChatroom_id}, ${
            this.newID
        }, ${userid})" type="button" class="btn btn-primary px-4 mx-2 my-3" data-toggle="tooltip" data-placement="top" title="Join this table">
                    <i class="fas fa-user-plus"></i>
                </button>

                <button id="pre-game-${this.newID}-quit" onclick="quitGame(${currentChatroom_id}, ${
            this.newID
        }, ${userid})" type="button" class="btn btn-primary px-4 mx-2 my-3" data-toggle="tooltip" data-placement="top" title="Leave this table">
                    <i class="fas fa-running"></i>
                </button>

                <button id="pre-game-${this.newID}-play" onclick="playGame(${currentChatroom_id}, ${
            this.newID
        }, ${userid})" type="button" class="btn btn-primary px-4 mx-2 my-3" data-placement="top" title="Start the game">
                    <i class="fas fa-play"></i>
                </button>

            </div>
            <div id="pre-game-${this.newID}-players" class="mx-4">
            </div>
        </div>
        `;
        // this.initEventListener(newID);
    }
    // initEventListener(newID) {
    //     const preGameAdd = document.querySelector(`#pre-game-${this.newID}-add`);
    //     const preGameJoin = document.querySelector(`#pre-game-${this.newID}-join`);
    //     const preGameQuit = document.querySelector(`#pre-game-${this.newID}-quit`);

    //     console.log(preGameAdd)

    //     preGameAdd.addEventListener("click", function (e) {
    //         console.log("asd")
    //         console.log(e.target.innerHTML)
    //         // new PreGameBoard(newID + 1);
    //     });

    //     preGameJoin.addEventListener("click", function(e) {
    //         document.querySelector(
    //             `#pre-game-${newID}-players`
    //         ).innerHTML = `<div id="pre-game-${newID}-p-${userid}" class="btn btn-outline-secondary w-100 my-1 py-1">${nickname}</div>`;
    //         console.log(`join ${newID}`)
    //     });

    //     preGameQuit.addEventListener("click", function(e) {
    //         document.querySelector(`#pre-game-${newID}-p-${userid}`).remove();
    //         console.log(`quit ${newID}`)
    //     });
    // }
}

// function initEventListener(id) {
// const preGameAdd = document.querySelector(`#pre-game-${this.newID}-add`);
// const preGameJoin = document.querySelector(`#pre-game-${this.newID}-join`);
// const preGameQuit = document.querySelector(`#pre-game-${this.newID}-quit`);

// console.log(preGameAdd)

// preGameAdd.addEventListener("click", function (e) {
//     console.log("asd")
//     console.log(e.target.innerHTML)
//     // new PreGameBoard(newID + 1);
// });

// preGameJoin.addEventListener("click", function(e) {
//     document.querySelector(
//         `#pre-game-${newID}-players`
//     ).innerHTML = `<div id="pre-game-${newID}-p-${userid}" class="btn btn-outline-secondary w-100 my-1 py-1">${nickname}</div>`;
//     console.log(`join ${newID}`)
// });

// preGameQuit.addEventListener("click", function(e) {
//     document.querySelector(`#pre-game-${newID}-p-${userid}`).remove();
//     console.log(`quit ${newID}`)
// });
// }

async function addNewTable() {
    // const newID = 1 + document.querySelector("#pre-game-card-main").children.length;
    // new PreGameBoard(newID);
    const chatroom_id = currentChatroom_id;
    const myBody = JSON.stringify({ chatroom_id });
    const resp = await fetch("/chatroom/add_new_table", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });

    if (resp.status === 200) {
        return;
        // await updatePreGameCard(currentChatroom_id);
    } else {
        // the main reason for err is that the user join more than 1 times
        // and the database reject the insert
        console.log(resp.message);
        return;
    }
}

function joinGamePlayer(gameTableID, myUserID, myNickname) {
    try {
        document.querySelector(
            `#pre-game-${gameTableID}-players`
        ).innerHTML += `<div id="pre-game-${gameTableID}-p-${myUserID}" class="btn btn-outline-secondary w-100 my-1 py-1 border-3">${myNickname}</div>`;
        // console.log(`join ${id}`);
    } catch {
        // the main reason for err is that the user join more than 1 times
        return;
    }
}

// function quitGame(gameTableID, myUserID) {
//     try {
//         document.querySelector(`#pre-game-${gameTableID}-p-${myUserID}`).remove();
//         // console.log(`quit ${id}`);
//     } catch {
//         // the main reason for err is that the user havent join, but click quit
//         return;
//     }
// }

async function joinGame(chatroom_id, gameTableID, myUserID) {
    const myBody = JSON.stringify({ chatroom_id, gameTableID, myUserID });
    // method: POST, Path: "/memo", Request Body
    const resp = await fetch("/chatroom/join_table", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
    if (resp.status === 200) {
        return;
        // await updatePreGameCard(currentChatroom_id);
    } else {
        // the main reason for err is that the user join more than 1 times
        // and the database reject the insert
        console.log(resp.message);
        return;
    }
}

async function quitGame(chatroom_id, gameTableID, myUserID) {
    const myBody = JSON.stringify({ chatroom_id, gameTableID, myUserID });
    // method: POST, Path: "/memo", Request Body
    const resp = await fetch("/chatroom/quit_table", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: myBody,
    });
    if (resp.status === 200) {
        return;
        // await updatePreGameCard(currentChatroom_id);
    } else {
        // the main reason for err is that the user havent join, but click quit
        console.log(resp.message);
        return;
    }
}

function addGame(id) {
    gameTypeCard.style.display = "flex";
    preGameTable = id;
}

crossGameTypeCard.addEventListener("click", function (e) {
    gameTypeCard.style.display = "none";
});

crossPreGameCard.addEventListener("click", function (e) {
    preGameCard.style.display = "none";
});

function getTableTypeHTML(gameType) {
    gameTypeCard.style.display = "none";

    switch (gameType) {
        case 0: {
            return `
                <div>
                    <i class="far fa-plus-square text-primary create-new-game-button"></i>
                </div>
            `;
        }

        case 1: {
            return `
                <div>
                    <img src="./image/apc_fig.png" alt="Aeroplane Chess" />
                </div>
                `;
        }
        case 2: {
            return `
                <div>
                    <img src="./image/reversi_fig.png" alt="Reversi" />
                </div>
                `;
        }
        case 3: {
            return `
                <div>
                    <img src="./image/big2_fig.png" alt="Big 2" />
                </div>
                `;
        }
        case 4: {
            return `
                <div>
                    <img src="./image/whack_mole_fig.png" alt="Whack Mole" />
                </div>
                `;
        }
    }
}

function displayPreGameCard() {
    preGameCard.style.display = "flex";
}

socket.on("update_pre_game_card", async (data) => {
    const targetChatroomID = data.targetChatroomID;

    if (currentChatroom_id == targetChatroomID) {
        await updatePreGameCard(currentChatroom_id);
    }
});

async function deleteTable(chatroom_id, gameTableID, myUserID) {
    const myBody = JSON.stringify({ chatroom_id, gameTableID, myUserID });
    const resp = await fetch("/chatroom/delete_table", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: myBody,
    });
    if (resp.status === 200) {
        return;
        // await updatePreGameCard(currentChatroom_id);
    } else {
        // the main reason for err is that the user havent join, but click quit
        console.log(resp.message);
        return;
    }
}

async function changeTableType(gameType) {
    const chatroom_id = currentChatroom_id;
    const gameTableID = preGameTable;
    const myUserID = userid;

    const myBody = JSON.stringify({ chatroom_id, gameTableID, myUserID, gameType });
    const resp = await fetch("/chatroom/change_table_type", {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: myBody,
    });
    if (resp.status === 200) {
        return;
        // await updatePreGameCard(currentChatroom_id);
    } else {
        // the main reason for err is that the user havent join, but click quit
        console.log(resp.message);
        return;
    }
}

async function playGame(chatroom_id, gameTableID, myUserID) {
    const myBody = JSON.stringify({ chatroom_id, gameTableID, myUserID });
    const resp = await fetch("/chatroom/play_game", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: myBody,
    });
    if (resp.status === 200) {
        const myData = (await resp.json()).data;
        const gameType = myData[gameTableID].gameType;
        switch (gameType) {
            case 0: {
                return;
            }
            case 1: {
                const newPlayers = [];

                for (let myKey in myData[gameTableID].user_id_obj) {
                    const newPlayer = myData[gameTableID].user_id_obj[myKey].user_id;
                    newPlayers.push(newPlayer);
                }
                createAeroplaneChess(newPlayers);
                return;
            }
            case 2: {
                return;
            }
            default: {
                return;
            }
        }
        // await updatePreGameCard(currentChatroom_id);
    } else {
        // the main reason for err is that the user havent join, but click quit
        console.log(resp.message);
        return;
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

// function testhihi(){
//     console.log('hihi')
// }

// socket.on('join_room', async(data){
//     socket.join("")
// })

// socket.on("chuenchuentest", async(data) =>{
//     console.log("received")
//     console.log(data.message);
// })

async function createAeroplaneChess(newPlayers) {
    // hardcode for testing
    // const newPlayers = {
    //     new_players_id: [1, 2, 3, 4],
    // };

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


async function logout() {
    const myBody = JSON.stringify({ });
    const resp = await fetch("/chatroom/logout", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: myBody,
    });

    if (resp.status === 200) {
        window.location = "/login.html"
        return;
    } else {
        console.log(resp.message);
        return;
    }
}