// status Boolean
let startStopStatus = true;

// global variable for the game
let fr;
let canvasSize;
let strokeColour;
let scaleFactor;
let FE_gameStatus;
let allClickableChess;
let movingChessArr = [];

// note from chuenchuen
// the rate is cancelled as computer resource usage too high
// the rate now set to 1 without any means to change
let animationRate = 1;

// win shape
let blue_crown;
let green_crown;
let red_crown;
let gold_crown;

let scriptInputCard = document.querySelector("#script-input-card");

// code for highlighting chess
let chess_highlight = [];

let player1_chess_0_btn = document.querySelector("#player1-chess-0-btn");
let player1_chess_1_btn = document.querySelector("#player1-chess-1-btn");
let player1_chess_2_btn = document.querySelector("#player1-chess-2-btn");
let player1_chess_3_btn = document.querySelector("#player1-chess-3-btn");

player1_chess_0_btn.addEventListener("mouseover", function () {
    chess_highlight = [1, 0];
});
player1_chess_1_btn.addEventListener("mouseover", function () {
    chess_highlight = [1, 1];
});
player1_chess_2_btn.addEventListener("mouseover", function () {
    chess_highlight = [1, 2];
});
player1_chess_3_btn.addEventListener("mouseover", function () {
    chess_highlight = [1, 3];
});

player1_chess_0_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});
player1_chess_1_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player1_chess_2_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player1_chess_3_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

let player2_chess_0_btn = document.querySelector("#player2-chess-0-btn");
let player2_chess_1_btn = document.querySelector("#player2-chess-1-btn");
let player2_chess_2_btn = document.querySelector("#player2-chess-2-btn");
let player2_chess_3_btn = document.querySelector("#player2-chess-3-btn");

player2_chess_0_btn.addEventListener("mouseover", function () {
    chess_highlight = [2, 0];
});
player2_chess_1_btn.addEventListener("mouseover", function () {
    chess_highlight = [2, 1];
});
player2_chess_2_btn.addEventListener("mouseover", function () {
    chess_highlight = [2, 2];
});
player2_chess_3_btn.addEventListener("mouseover", function () {
    chess_highlight = [2, 3];
});

player2_chess_0_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});
player2_chess_1_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player2_chess_2_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player2_chess_3_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

let player3_chess_0_btn = document.querySelector("#player3-chess-0-btn");
let player3_chess_1_btn = document.querySelector("#player3-chess-1-btn");
let player3_chess_2_btn = document.querySelector("#player3-chess-2-btn");
let player3_chess_3_btn = document.querySelector("#player3-chess-3-btn");

player3_chess_0_btn.addEventListener("mouseover", function () {
    chess_highlight = [3, 0];
});
player3_chess_1_btn.addEventListener("mouseover", function () {
    chess_highlight = [3, 1];
});
player3_chess_2_btn.addEventListener("mouseover", function () {
    chess_highlight = [3, 2];
});
player3_chess_3_btn.addEventListener("mouseover", function () {
    chess_highlight = [3, 3];
});

player3_chess_0_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});
player3_chess_1_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player3_chess_2_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player3_chess_3_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

let player4_chess_0_btn = document.querySelector("#player4-chess-0-btn");
let player4_chess_1_btn = document.querySelector("#player4-chess-1-btn");
let player4_chess_2_btn = document.querySelector("#player4-chess-2-btn");
let player4_chess_3_btn = document.querySelector("#player4-chess-3-btn");

player4_chess_0_btn.addEventListener("mouseover", function () {
    chess_highlight = [4, 0];
});
player4_chess_1_btn.addEventListener("mouseover", function () {
    chess_highlight = [4, 1];
});
player4_chess_2_btn.addEventListener("mouseover", function () {
    chess_highlight = [4, 2];
});
player4_chess_3_btn.addEventListener("mouseover", function () {
    chess_highlight = [4, 3];
});

player4_chess_0_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});
player4_chess_1_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player4_chess_2_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player4_chess_3_btn.addEventListener("mouseleave", function () {
    chess_highlight = [];
});

player_chess_btn_obj = {};
player_chess_btn_obj["player_1"] = [player1_chess_0_btn, player1_chess_1_btn, player1_chess_2_btn, player1_chess_3_btn];
player_chess_btn_obj["player_2"] = [player2_chess_0_btn, player2_chess_1_btn, player2_chess_2_btn, player2_chess_3_btn];
player_chess_btn_obj["player_3"] = [player3_chess_0_btn, player3_chess_1_btn, player3_chess_2_btn, player3_chess_3_btn];
player_chess_btn_obj["player_4"] = [player4_chess_0_btn, player4_chess_1_btn, player4_chess_2_btn, player4_chess_3_btn];

// end of chess highlighting

// animation rate control
let haveAnimation = false;
let animationONOFF = document.querySelector("#animation-on-off");
animationONOFF.addEventListener("change", function () {
    if (animationONOFF.checked) {
        haveAnimation = true;
    } else {
        haveAnimation = false;
    }
});

// end of animation rate control

// for controlling the script
let script_on_off_check_box = document.querySelector("#script-on-off");
let scriptscript_input_container = document.querySelector("#script-input-container");
let scriptscript_input = document.querySelector("#script-input");

script_on_off_check_box.addEventListener("change", function () {
    if (script_on_off_check_box.checked) {
        scriptscript_input_container.style.display = "block";
    } else {
        scriptscript_input_container.style.display = "none";
        scriptscript_input.disabled = true;
        autoPlayStatus = false;
    }
});

function enableScriptInput() {
    scriptscript_input.disabled = false;
    scriptInputCard.style.display = "flex";
    autoPlayStatus = false;
}

let autoPlay;
function submitAndDisableScriptInput() {
    scriptscript_input.disabled = true;
    let myStr = scriptscript_input.value;
    try {
        autoPlayStatus = true;
        scriptInputCard.style.display = "none";
        window.eval(myStr);
    } catch (err) {
        autoPlayStatus = false;
        console.log(err);
    }
}

// for controlling the script

// for mini-chatroom
// the sendMessage function is defined at socket file
let messageInput = document.querySelector("#messageInput");
messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage(messageInput.value);
        messageInput.value = "";
    }
});
// end of mini-chatroom

// init gameStatus
FE_gameStatus = {
    allPlayers: {
        player_1: {
            chessStatus: {
                0: { colourCode: 0, boardCode: 0, local_id: 0 },
                1: { colourCode: 0, boardCode: 0, local_id: 1 },
                2: { colourCode: 0, boardCode: 0, local_id: 2 },
                3: { colourCode: 0, boardCode: 0, local_id: 3 },
            },
            rollTimes: 0,
            lastMoveChess: null,
            actionStatus: 1,
        },
        player_2: {
            chessStatus: {
                0: { colourCode: 1, boardCode: 0, local_id: 0 },
                1: { colourCode: 1, boardCode: 0, local_id: 1 },
                2: { colourCode: 1, boardCode: 0, local_id: 2 },
                3: { colourCode: 1, boardCode: 0, local_id: 3 },
            },
            rollTimes: 0,
            lastMoveChess: null,
            actionStatus: 0,
        },
        player_3: {
            chessStatus: {
                0: { colourCode: 2, boardCode: 0, local_id: 0 },
                1: { colourCode: 2, boardCode: 0, local_id: 1 },
                2: { colourCode: 2, boardCode: 0, local_id: 2 },
                3: { colourCode: 2, boardCode: 0, local_id: 3 },
            },
            rollTimes: 0,
            lastMoveChess: null,
            actionStatus: 0,
        },
        player_4: {
            chessStatus: {
                0: { colourCode: 3, boardCode: 0, local_id: 0 },
                1: { colourCode: 3, boardCode: 0, local_id: 1 },
                2: { colourCode: 3, boardCode: 0, local_id: 2 },
                3: { colourCode: 3, boardCode: 0, local_id: 3 },
            },
            rollTimes: 0,
            lastMoveChess: null,
            actionStatus: 0,
        },
    },
    endGame: false,
    winner: "",
    turn: 1,
    roll_number: 1,
    animationArr: [],
};
// end of gameStatus

// for choosing chess
function canvasClickLogic() {
    // console.log(`x: ${mouseX - canvasSize / 2}, y: ${mouseY - canvasSize / 2}`);
    const mx = mouseX - canvasSize / 2;
    const my = mouseY - canvasSize / 2;
    let clickedChessArr = allClickableChess.reportClickedChess(mx, my);
    if (clickedChessArr.length > 0) {
        // console.log(clickedChessArr[0]);
        const clickedColourCode = parseInt(clickedChessArr[0].player.replace("player_", "")) - 1;
        if (clickedColourCode == this_player_colour_code) {
            moveChess(clickedChessArr[0].chess_id, FE_roll_number);
        }
    }
    return;
}
// end of choosing choose

// for setup in p5
function setup() {
    // set the basic parameter of the canvas
    canvasSize = Math.min(windowHeight, windowWidth) * 0.9;
    scaleFactor = canvasSize / 170;
    fr = 30;
    strokeColour = "black";

    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent(document.querySelector("#canvas"));

    // add event listener for clicking the canvas
    canvas.mouseClicked(canvasClickLogic);

    frameRate(fr);

    blue_crown = loadImage("/image/blue_crown.svg");
    green_crown = loadImage("/image/green_crown.svg");
    red_crown = loadImage("/image/red_crown.svg");
    gold_crown = loadImage("/image/gold_crown.svg");

    init(scaleFactor);
}

function draw() {
    background("white");
    drawStaticBackground(scaleFactor);
    drawChess(FE_gameStatus, scaleFactor);
    drawHighlight(scaleFactor);
}

/**
 * Initialize/reset the board state
 */
function init(sf) {
    drawStaticBackground(sf);
    allClickableChess = new AllClickableChess(FE_gameStatus, sf);
}

function windowResized() {
    setup();
}

function drawStaticBackground(sf) {
    drawPrisonSquares(sf);
    drawBoardMain(sf);
    drawArrow(sf);
    drawShortcutArrow(sf);
    drawBoardPrisonCircle(sf);
    drawBoardReadyCircle(sf);
    drawBoardMainCircle(sf);
    drawBoardSafeCircle(sf);
    // for debug use
    // lableCellIndex(sf);
}

function drawPrisonSquares(sf) {
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    stroke(strokeColour);
    translate(canvasSize / 2, canvasSize / 2);
    for (let i = 0; i < 4; i++) {
        fill(colour_def[i]);
        rect(65 * sf, -65 * sf, 40 * sf, 40 * sf);
        fill("white");
        rotate(90);
    }
    pop();
}

function drawBoardMain(sf) {
    push();
    translate(canvasSize / 2, canvasSize / 2);
    rectMode(CENTER);
    stroke(strokeColour);

    for (let myKey in board_main) {
        const cell = board_main[myKey];
        const shapeCode = cell["shape_code"];
        const colourCode = cell["colour_code"];

        fill(colour_def[colourCode]);

        if (shapeCode <= 1) {
            const rectObj = board_main_draw_rect[myKey];
            const rect_x = rectObj["rect_center_x"] * sf;
            const rect_y = rectObj["rect_center_y"] * sf;
            const rect_width = rectObj["width"] * sf;
            const rect_height = rectObj["height"] * sf;
            rect(rect_x, rect_y, rect_width, rect_height);
        } else {
            const triObj = board_main_draw_tri[myKey];

            fill(colour_def[colourCode]);
            const tri_x1 = triObj["x1"] * sf;
            const tri_y1 = triObj["y1"] * sf;
            const tri_x2 = triObj["x2"] * sf;
            const tri_y2 = triObj["y2"] * sf;
            const tri_x3 = triObj["x3"] * sf;
            const tri_y3 = triObj["y3"] * sf;
            triangle(tri_x1, tri_y1, tri_x2, tri_y2, tri_x3, tri_y3);

            // for debug use
            // fill("black")
            // text(i, tri_x1, tri_y1);
        }
    }

    pop();
}

function drawBoardReadyCircle(sf) {
    push();
    translate(canvasSize / 2, canvasSize / 2);
    strokeWeight(1 * sf);
    for (let i in board_ready) {
        const myColourCode = board_ready[i]["colour_code"];
        stroke(colour_def[myColourCode]);
        const circle_x = board_ready[i]["x"] * sf;
        const circle_y = board_ready[i]["y"] * sf;
        const circle_diameter = 9 * sf;
        fill("white");
        circle(circle_x, circle_y, circle_diameter);
    }

    pop();
}

function drawBoardMainCircle(sf) {
    push();
    translate(canvasSize / 2, canvasSize / 2);
    stroke(strokeColour);

    for (let i in board_main) {
        const circle_x = board_main[i]["x"] * sf;
        const circle_y = board_main[i]["y"] * sf;
        const circle_diameter = 9 * sf;
        fill("white");
        circle(circle_x, circle_y, circle_diameter);
    }

    pop();
}

function drawArrow(sf) {
    push();
    stroke(strokeColour);
    angleMode(DEGREES);
    translate(canvasSize / 2, canvasSize / 2);
    for (let i = 0; i < 4; i++) {
        fill(colour_def[i]);
        drawArrowShape(sf);
        rotate(90);
    }
    pop();
}

// for debug use
function lableCellIndex(sf) {
    push();
    translate(canvasSize / 2, canvasSize / 2);
    stroke(strokeColour);
    fill("black");
    for (let myKey in board_main) {
        const cell = board_main[myKey];
        const circle_x = cell["x"] * sf;
        const circle_y = cell["y"] * sf;
        text(myKey, circle_x, circle_y);
    }

    pop();
}

function drawArrowShape(sf) {
    beginShape();
    vertex(-5 * sf, -65 * sf);
    vertex(5 * sf, -65 * sf);
    vertex(5 * sf, -15 * sf);
    vertex(15 * sf, -15 * sf);
    vertex(0 * sf, 0 * sf);
    vertex(-15 * sf, -15 * sf);
    vertex(-5 * sf, -15 * sf);
    endShape(CLOSE);
}

function drawBoardSafeCircle(sf) {
    push();
    stroke(strokeColour);
    fill("white");
    translate(canvasSize / 2, canvasSize / 2);
    for (let myKey in board_safe) {
        const arrowCircleObj = board_safe[myKey];
        const circle_x = arrowCircleObj.x * sf;
        const circle_y = arrowCircleObj.y * sf;
        const circle_diameter = 9 * sf;
        circle(circle_x, circle_y, circle_diameter);

        // for debug use
        // text(
        //     `${myKey}\n${arrowCircleObj.colour_code} - ${arrowCircleObj.local_id}`,
        //     circle_x,
        //     circle_y
        // );
    }
    pop();
}

function drawBoardPrisonCircle(sf) {
    push();
    stroke(strokeColour);
    fill("white");
    translate(canvasSize / 2, canvasSize / 2);
    for (let myKey in board_prison) {
        const prisonCircleObj = board_prison[myKey];
        const circle_x = prisonCircleObj.x * sf;
        const circle_y = prisonCircleObj.y * sf;
        const circle_diameter = 9 * sf;
        circle(circle_x, circle_y, circle_diameter);

        // for debug use
        // text(
        //     `${myKey}\n${prisonCircleObj.colour_code} - ${prisonCircleObj.local_id}`,
        //     circle_x,
        //     circle_y
        // );
    }
    pop();
}

function drawShortcutArrow(sf) {
    push();
    rectMode(CENTER);
    angleMode(DEGREES);
    stroke(strokeColour);
    translate(canvasSize / 2, canvasSize / 2);

    for (let i = 0; i < 4; i++) {
        fill(colour_def[i]);
        const basePoints = [
            [23, 39.14],
            [13, 39.14],
            [-7, 39.14],
            [-17, 39.14],
        ];
        for (const basePoint of basePoints) {
            const bx = basePoint[0];
            const by = basePoint[1];
            const rect_x = -1.8 * sf + bx * sf;
            const rect_y = by * sf;
            const rect_width = 3.6 * sf;
            const rect_height = 1 * sf;
            rect(rect_x, rect_y, rect_width, rect_height);

            const tri_x1 = bx * sf - 3.6 * sf;
            const tri_x2 = bx * sf - 3.6 * sf;
            const tri_x3 = bx * sf - 6 * sf;
            const tri_y1 = by * sf + 1 * sf;
            const tri_y2 = by * sf - 1 * sf;
            const tri_y3 = by * sf;
            triangle(tri_x1, tri_y1, tri_x2, tri_y2, tri_x3, tri_y3);
        }
        rotate(90);
    }

    pop();
}

function drawChess(myGameStatus, sf) {
    // rectMode(CENTER);

    for (let i = 1; i <= 4; i++) {
        for (let j = 0; j < 4; j++) {
            // if the rate >= 20, skip all animation
            if (haveAnimation) {
                // checking for if the chess is active moving
                if (movingChessArr.length > 0) {
                    if (movingChessArr[0].player_number == i && movingChessArr[0].chess_id == j) {
                        stroke(colour_def[i - 1]);
                        fill(colour_def[i - 1]);
                        const { chess_x, chess_y } = movingChessArr[0].reportPosition();
                        const myOrientation = movingChessArr[0].reportOrientaion();
                        drawChessBorder(chess_x, chess_y, sf);
                        drawAeroplaneShape(chess_x, chess_y, sf, myOrientation);
                        movingChessArr[0].addAmt();
                        movingChessArr[0].checkAndRemoveMovingChess();
                        continue;
                    }
                }

                // for the case of active moving chess, but have kill, we need to anchor the position of the killed chess
                // the killed chess at the first of the array, the killed chess is moving and the animation is given in the above if-block
                // if the killed chess not at the first of the array, anchor its old position
                if (movingChessArr.length > 1) {
                    let jumpFlag = false;

                    for (let myKey = 1; myKey < movingChessArr.length; myKey++) {
                        let myChess = movingChessArr[myKey];
                        if (
                            myChess.player_number == i &&
                            myChess.chess_id == j &&
                            (myChess.moving_type == "kill" || myChess.moving_type == "kill_safe")
                        ) {
                            stroke(colour_def[i - 1]);
                            fill(colour_def[i - 1]);
                            const { chess_x, chess_y } = myChess.reportPosition();
                            const myOrientation = myChess.reportCurrentStaicOrientation();
                            drawChessBorder(chess_x, chess_y, sf);
                            drawAeroplaneShape(chess_x, chess_y, sf, myOrientation);
                            jumpFlag = true;
                            continue;
                        }
                    }

                    if (jumpFlag) {
                        continue;
                    }
                }
            }

            const myChess = myGameStatus.allPlayers[`player_${i}`].chessStatus[`${j}`];
            let myBoard = {};
            let chess_x;
            let chess_y;
            switch (myChess.boardCode) {
                case 0: {
                    myBoard = board_prison;
                    break;
                }
                case 1: {
                    myBoard = board_ready;
                    break;
                }
                case 2: {
                    myBoard = board_main;
                    break;
                }
                case 3: {
                    myBoard = board_safe;
                    break;
                }
                case 4: {
                    myBoard = board_prison;
                    break;
                }
                default: {
                    myBoard = board_prison;
                }
            }

            for (let myKey in myBoard) {
                if (myChess.boardCode != 2) {
                    if (
                        myBoard[myKey].colour_code == myChess.colourCode &&
                        myBoard[myKey].local_id == myChess.local_id
                    ) {
                        chess_x = myBoard[myKey].x * sf;
                        chess_y = myBoard[myKey].y * sf;
                    }
                } else if (myKey == myChess.local_id) {
                    chess_x = myBoard[myKey].x * sf;
                    chess_y = myBoard[myKey].y * sf;
                }
            }

            // circle(chess_x, chess_y, 5 * sf);
            // textSize(6 * sf);
            // textAlign(CENTER, CENTER);

            stroke(colour_def[i - 1]);
            fill(colour_def[i - 1]);
            let myOrientation = getChessOrientation(myChess.colourCode, myChess.boardCode, myChess.local_id);
            drawChessBorder(chess_x, chess_y, sf);
            if (myChess.boardCode == 4) {
                drawWinShape(chess_x, chess_y, sf, i - 1);
            } else {
                drawAeroplaneShape(chess_x, chess_y, sf, myOrientation);
            }

            // text(j, chess_x, chess_y);
        }
    }
}

function drawChessBorder(xi, yi, sf) {
    push();
    translate(canvasSize / 2, canvasSize / 2);
    translate(xi, yi);
    strokeWeight(2);
    fill("white");
    circle(0, 0, 7.5 * sf);
    pop();
}

function drawAeroplaneShape(xi, yi, sf, orientation) {
    push();
    translate(canvasSize / 2, canvasSize / 2);
    translate(xi, yi);
    angleMode(DEGREES);
    rotate(orientation);

    noStroke();
    beginShape();
    for (let pt of aeroplaneShape) {
        vertex(pt.x * sf * 0.8, pt.y * sf * 0.8);
    }
    endShape(CLOSE);
    pop();
}

function drawWinShape(xi, yi, sf, colour_code) {
    push();
    imageMode(CENTER);
    translate(canvasSize / 2, canvasSize / 2);
    translate(xi, yi);
    switch (colour_code) {
        case 0: {
            image(blue_crown, 0, 0, 6 * scaleFactor, 6 * sf);
            break;
        }
        case 1: {
            image(green_crown, 0, 0, 6 * scaleFactor, 6 * sf);
            break;
        }
        case 2: {
            image(red_crown, 0, 0, 6 * scaleFactor, 6 * sf);
            break;
        }
        case 3: {
            image(gold_crown, 0, 0, 6 * scaleFactor, 6 * sf);
            break;
        }
    }
    pop();
}

function getChessXY(myColourCode, myBoardCode, my_local_id, sf) {
    let myBoard = {};
    let chess_x;
    let chess_y;

    switch (myBoardCode) {
        case 0: {
            myBoard = board_prison;
            break;
        }
        case 1: {
            myBoard = board_ready;
            break;
        }
        case 2: {
            myBoard = board_main;
            break;
        }
        case 3: {
            myBoard = board_safe;
            break;
        }
        case 4: {
            myBoard = board_prison;
            break;
        }
        default: {
            myBoard = board_prison;
        }
    }

    for (let myKey in myBoard) {
        if (myBoardCode != 2) {
            if (myBoard[myKey].colour_code == myColourCode && myBoard[myKey].local_id == my_local_id) {
                chess_x = myBoard[myKey].x * sf;
                chess_y = myBoard[myKey].y * sf;
            }
        } else if (myKey == my_local_id) {
            chess_x = myBoard[myKey].x * sf;
            chess_y = myBoard[myKey].y * sf;
        }
    }
    return { chess_x, chess_y };
}

function angleBewteenTwoPoints({ p1, p2 }) {
    let angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
    return angleDeg;
}

function getChessOrientation(myColourCode, myBoardCode, my_local_id) {
    switch (myBoardCode) {
        case 0: {
            return 180;
        }
        case 1: {
            return myColourCode * 90;
            break;
        }
        case 2: {
            // scalefactor is irrelavent in the angle calculation, so set it to 1
            let chess1 = getChessXY(myColourCode, myBoardCode, my_local_id, 1);
            let p1 = { x: chess1.chess_x, y: chess1.chess_y };
            let p2 = {};
            let currentStep = 0;
            for (let myStep in board_main_route) {
                if (board_main_route[myStep][`player_${myColourCode + 1}`] == my_local_id) {
                    currentStep = myStep;
                }
            }
            if (currentStep == 50) {
                p2["x"] = 0;
                p2["y"] = 0;
            } else {
                next_local_id = (my_local_id + 1) % 52;
                let chess2 = getChessXY(myColourCode, myBoardCode, next_local_id, 1);
                p2 = { x: chess2.chess_x, y: chess2.chess_y };
            }
            let orientation = -90 + angleBewteenTwoPoints({ p1, p2 });
            return orientation;
        }
        case 3: {
            let chess1 = getChessXY(myColourCode, myBoardCode, my_local_id, 1);
            let p1 = { x: chess1.chess_x, y: chess1.chess_y };
            let p2 = { x: 0, y: 0 };
            let orientation = -90 + angleBewteenTwoPoints({ p1, p2 });
            return orientation;
        }
        case 4: {
            return 180;
        }
        default: {
            return 180;
        }
    }
}

class ClickableChess {
    constructor(x, y, r, sf, status) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.sf = sf;
        this.status = status;
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.x, this.y);
        if (d <= this.r * this.sf) {
            return true;
        } else {
            return false;
        }
    }

    reportStatus() {
        return this.status;
    }

    enable() {
        this.status = true;
        return this.status;
    }

    disable() {
        this.status = false;
        return this.status;
    }

    updatePostion(x, y) {
        this.x = x;
        this.y = y;
        return;
    }

    updateRadiusAndScaleFactor(r, sf) {
        this.r = r;
        this.sf = sf;
        return;
    }
}

class AllClickableChess {
    constructor(myGameStatus, sf) {
        this.sf = sf;
        this.data = {};

        for (const myPlayerKey in myGameStatus.allPlayers) {
            const myPlayer = myGameStatus.allPlayers[myPlayerKey];
            this.data[myPlayerKey] = {};
            for (const myChessID in myPlayer.chessStatus) {
                const myColourCode = myPlayer.chessStatus[myChessID].colourCode;
                const myBoardCode = myPlayer.chessStatus[myChessID].boardCode;
                const my_local_id = myPlayer.chessStatus[myChessID].local_id;
                const chess_position = getChessXY(myColourCode, myBoardCode, my_local_id, this.sf);
                // console.log(chess_position);
                this.data[myPlayerKey][myChessID] = new ClickableChess(
                    chess_position.chess_x,
                    chess_position.chess_y,
                    9,
                    this.sf,
                    true
                );
            }
        }
    }

    updatePostion(myGameStatus) {
        for (const myPlayerKey in myGameStatus.allPlayers) {
            const myPlayer = myGameStatus.allPlayers[myPlayerKey];
            // console.log(myPlayerKey);
            for (const myChessID in myPlayer.chessStatus) {
                // console.log(myChessID);
                const myColourCode = myPlayer.chessStatus[myChessID].colourCode;
                const myBoardCode = myPlayer.chessStatus[myChessID].boardCode;
                const my_local_id = myPlayer.chessStatus[myChessID].local_id;
                const chess_position = getChessXY(myColourCode, myBoardCode, my_local_id, this.sf);
                const myClickableChess = this.data[myPlayerKey][myChessID];
                const new_x = chess_position.chess_x;
                const new_y = chess_position.chess_y;
                myClickableChess.updatePostion(new_x, new_y);
            }
        }
    }

    toggleAllPlayersStatus(active_player) {
        for (const myPlayerKey in this.data) {
            const myPlayer = this.data[myPlayerKey];
            for (const myChessID in myPlayer) {
                const myClickableChess = myPlayer[myChessID];
                if (myPlayerKey == active_player) {
                    myClickableChess.enable;
                } else {
                    myClickableChess.disable;
                }
            }
        }
    }

    reportClickedChess(mx, my) {
        const clickedChessArr = [];
        for (const myPlayerKey in this.data) {
            const myPlayer = this.data[myPlayerKey];
            for (const myChessID in myPlayer) {
                const myClickableChess = myPlayer[myChessID];
                if (myClickableChess.isClicked(mx, my) == true) {
                    clickedChessArr.push({ player: myPlayerKey, chess_id: myChessID });
                }
            }
        }
        return clickedChessArr;
    }

    updateAllRadiusAndScaleFactor(r, sf) {
        for (const myPlayerKey in this.data) {
            const myPlayer = this.data[myPlayerKey];
            for (const myChessID in myPlayer) {
                const myClickableChess = myPlayer[myChessID];
                myClickableChess.updateRadiusAndScaleFactor(r, sf);
            }
        }
    }
}

class MovingChess {
    constructor(data, rate, sf) {
        // chuenchuen note
        // data in the type of the following
        // type apc_animation = {
        //     player: string;
        //     chess_id: number;
        //     moving_type: string;
        //     currentPosition: { boardCode: number; local_id: number };
        //     targetPosition: { boardCode: number; local_id: number };
        // };

        // from data object
        this.player = data.player;
        this.chess_id = data.chess_id;
        this.moving_type = data.moving_type;
        this.currentPosition = data.currentPosition;
        this.targetPosition = data.targetPosition;

        // input for controlling the rate of animation
        this.amt = 0;
        // this.amt_step = 0.1;

        // chuenchuen note
        // moving type as following
        // moving_type:
        // | "ready"
        // | "main_move"
        // | "jump"
        // | "shortcut"
        // | "safe_move"
        // | "safe_move_bounce"
        // | "kill"
        // | "kill_safe"
        // | "finish"
        // | "suicide";

        switch (this.moving_type) {
            case "ready": {
                this.amt_step = 0.1;
                break;
            }
            case "main_move": {
                this.amt_step = 0.1;
                break;
            }
            case "jump": {
                this.amt_step = 0.07;
                break;
            }
            case "shortcut": {
                this.amt_step = 0.05;
                break;
            }
            case "safe_move": {
                this.amt_step = 0.1;
                break;
            }
            case "safe_move_bounce": {
                this.amt_step = 0.1;
                break;
            }
            // note chuenchuen
            // the following moving rate should calcaute from position difference
            // now hardcode an value for simplicity
            case "kill": {
                this.amt_step = 0.05;
                break;
            }
            case "kill_safe": {
                this.amt_step = 0.05;
                break;
            }
            case "finish": {
                this.amt_step = 0.05;
                break;
            }
            case "suicide": {
                this.amt_step = 0.05;
                break;
            }
            default: {
                this.amt_step = 0.1;
                break;
            }
        }

        this.rate = rate;

        // scale factor
        this.sf = sf;

        this.player_number = this.player.replace("player_", "");
    }

    setRate(rate) {
        this.rate = rate;
    }

    checkAndRemoveMovingChess() {
        if (this.amt >= 1 + this.amt_step * this.rate) {
            // this is an global variable
            movingChessArr.shift();
            return true;
        }
        return false;
    }

    addAmt() {
        this.amt = this.amt + this.amt_step * this.rate;
    }

    reportPosition() {
        const p1 = getChessXY(
            this.player_number - 1,
            this.currentPosition.boardCode,
            this.currentPosition.local_id,
            this.sf
        );
        const p2 = getChessXY(
            this.player_number - 1,
            this.targetPosition.boardCode,
            this.targetPosition.local_id,
            this.sf
        );
        const pq = {
            chess_x: lerp(p1.chess_x, p2.chess_x, Math.min(1, this.amt)),
            chess_y: lerp(p1.chess_y, p2.chess_y, Math.min(1, this.amt)),
        };
        return pq;
    }

    reportOrientaion() {
        const p1_temp = getChessXY(
            this.player_number - 1,
            this.currentPosition.boardCode,
            this.currentPosition.local_id,
            this.sf
        );
        const p2_temp = getChessXY(
            this.player_number - 1,
            this.targetPosition.boardCode,
            this.targetPosition.local_id,
            this.sf
        );
        const p1 = { x: p1_temp.chess_x, y: p1_temp.chess_y };
        const p2 = { x: p2_temp.chess_x, y: p2_temp.chess_y };
        let orientation = -90 + angleBewteenTwoPoints({ p1, p2 });
        return orientation;
    }

    reportCurrentStaicOrientation() {
        const myColourCode = this.player_number - 1;
        const myBoardCode = this.currentPosition.boardCode;
        const my_local_id = this.currentPosition.local_id;
        const myOrientaion = getChessOrientation(myColourCode, myBoardCode, my_local_id);
        return myOrientaion;
    }
}

function drawHighlight(sf) {
    push();
    translate(canvasSize / 2, canvasSize / 2);
    fill("rgba(255,255,0, 0.5)");
    try {
        const x = allClickableChess.data[`player_${chess_highlight[0]}`][chess_highlight[1]].x;
        const y = allClickableChess.data[`player_${chess_highlight[0]}`][chess_highlight[1]].y;
        circle(x, y, 10 * sf);
        pop();
        return;
    } catch (err) {
        pop();
        return;
    }
}

function update_player_chess_btn_obj() {
    try {
        for (let myPlayerKey in FE_gameStatus.allPlayers) {
            for (let myChessKey in FE_gameStatus.allPlayers[myPlayerKey]["chessStatus"]) {
                const myChess = FE_gameStatus.allPlayers[myPlayerKey]["chessStatus"][myChessKey];
                if (myChess.boardCode == 0 || myChess.boardCode == 1) {
                    player_chess_btn_obj[myPlayerKey][myChessKey].innerText = 56;
                }
                if (myChess.boardCode == 4) {
                    player_chess_btn_obj[myPlayerKey][myChessKey].innerText = 0;
                }
                if (myChess.boardCode == 3) {
                    player_chess_btn_obj[myPlayerKey][myChessKey].innerText = myChess.local_id;
                }
                if (myChess.boardCode == 2) {
                    player_chess_btn_obj[myPlayerKey][myChessKey].innerText =
                        6 + 50 - boardMainIDToLocalStep(myPlayerKey, myChess.local_id);
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function boardMainIDToLocalStep(playerKey, boardMainID) {
    for (let myKey in board_main_route) {
        if (board_main_route[myKey][playerKey] == boardMainID) {
            return parseInt(myKey);
        }
    }
    return 0;
}

function closeWinCard() {
    document.querySelector("#win-game-card").style.display = "none";
}

// bot
// final version for testing

function myShuffle(arr) {
    let currentIndex = arr.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
}

function chuenStrategy() {
    switch (userName) {
        case "chuen": {
            // 1st strategy
            // random choose

            autoPlay = function strategy1(my_gameStatus, my_colour_code, my_movableChessArr) {
                const shuffleArr = myShuffle(my_movableChessArr);
                const myAutoChosenChess = parseInt(my_movableChessArr[0]);
                return myAutoChosenChess;
            };

            // end of 1st strategy

            break;
        }
        case "roye": {
            // 2nd strategy
            // finish one chess first
            autoPlay = function strategy2(my_gameStatus, my_colour_code, my_movableChessArr) {
                const myAutoChosenChess = parseInt(my_movableChessArr[0]);
                return myAutoChosenChess;
            };

            // end of 2nd strategy

            break;
        }
        case "tony": {
            // 3rd strategy
            // finish one chess first
            // if six out prison
            autoPlay = function strategy3(my_gameStatus, my_colour_code, my_movableChessArr) {
                const myChessStatus = my_gameStatus.allPlayers[`player_${my_colour_code + 1}`].chessStatus;
                for (let myKey of my_movableChessArr) {
                    if (myChessStatus[myKey].boardCode == 0) {
                        return parseInt(myKey);
                    }
                }
                const myAutoChosenChess = parseInt(my_movableChessArr[0]);
                return myAutoChosenChess;
            };

            // end of 3rd strategy

            break;
        }
        case "chuen2": {
            // 4th strategy
            // finish one chess first
            // if six out prison
            // move main zone chess prior to safe zone chess
            autoPlay = function strategy4(my_gameStatus, my_colour_code, my_movableChessArr) {
                const myChessStatus = my_gameStatus.allPlayers[`player_${my_colour_code + 1}`].chessStatus;
                for (let myKey of my_movableChessArr) {
                    if (myChessStatus[myKey].boardCode == 0) {
                        return parseInt(myKey);
                    }
                }
                for (let myKey of my_movableChessArr) {
                    if (myChessStatus[myKey].boardCode == 3) {
                        if (myChessStatus[myKey].local_id == my_gameStatus.roll_number) {
                            return parseInt(myKey);
                        }
                        if (myChessStatus[myKey].local_id == 3 && my_gameStatus.roll_number != 6) {
                            return parseInt(myKey);
                        }
                        continue;
                    }
                    if (myChessStatus[myKey].boardCode == 2) {
                        return parseInt(myKey);
                    }
                }
                const myAutoChosenChess = parseInt(my_movableChessArr[0]);
                return myAutoChosenChess;
            };

            // end of 4th strategy

            break;
        }
    }

    // delay the autostart
    setTimeout(function () {
        autoPlayStatus = true;
    }, 2000);

    // try to init the game with different time
    setTimeout(function () {
        roll_dice();
    }, 2000 + Math.random() * 2000);

    setTimeout(function () {
        roll_dice();
    }, 4000 + Math.random() * 2000);

    setTimeout(function () {
        roll_dice();
    }, 6000 + Math.random() * 2000);

    return;
}

// end of bot
