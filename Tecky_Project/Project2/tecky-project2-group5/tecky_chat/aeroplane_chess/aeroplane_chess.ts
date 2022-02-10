type ColourCode = 0 | 1 | 2 | 3;
type BoardCode = 0 | 1 | 2 | 3 | 4;
type Local_id = number;
export type Player_Key = "player_1" | "player_2" | "player_3" | "player_4";

export type apc_animation = {
    player: string;
    chess_id: number;
    moving_type:
        | "ready"
        | "main_move"
        | "jump"
        | "shortcut"
        | "safe_move"
        | "safe_move_bounce"
        | "kill"
        | "kill_safe"
        | "finish"
        | "suicide";
    currentPosition: { boardCode: number; local_id: number };
    targetPosition: { boardCode: number; local_id: number };
};

export type GameStatus = {
    allPlayers: {
        player_1: {
            chessStatus: {
                0: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                1: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                2: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                3: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
            };
            rollTimes: number;
            lastMoveChess: number | null;
            actionStatus: number;
        };
        player_2: {
            chessStatus: {
                0: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                1: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                2: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                3: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
            };
            rollTimes: number;
            lastMoveChess: number | null;
            actionStatus: number;
        };
        player_3: {
            chessStatus: {
                0: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                1: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                2: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                3: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
            };
            rollTimes: number;
            lastMoveChess: number | null;
            actionStatus: number;
        };
        player_4: {
            chessStatus: {
                0: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                1: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                2: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
                3: { colourCode: ColourCode; boardCode: BoardCode; local_id: number };
            };
            rollTimes: number;
            lastMoveChess: number | null;
            actionStatus: number;
        };
    };
    endGame: boolean;
    winner: string;
    turn: number;
    roll_number: number;
    animationArr: apc_animation[];
};

let board_main_route = {
    "1": { player_1: 3, player_2: 16, player_3: 29, player_4: 42 },
    "2": { player_1: 4, player_2: 17, player_3: 30, player_4: 43 },
    "3": { player_1: 5, player_2: 18, player_3: 31, player_4: 44 },
    "4": { player_1: 6, player_2: 19, player_3: 32, player_4: 45 },
    "5": { player_1: 7, player_2: 20, player_3: 33, player_4: 46 },
    "6": { player_1: 8, player_2: 21, player_3: 34, player_4: 47 },
    "7": { player_1: 9, player_2: 22, player_3: 35, player_4: 48 },
    "8": { player_1: 10, player_2: 23, player_3: 36, player_4: 49 },
    "9": { player_1: 11, player_2: 24, player_3: 37, player_4: 50 },
    "10": { player_1: 12, player_2: 25, player_3: 38, player_4: 51 },
    "11": { player_1: 13, player_2: 26, player_3: 39, player_4: 0 },
    "12": { player_1: 14, player_2: 27, player_3: 40, player_4: 1 },
    "13": { player_1: 15, player_2: 28, player_3: 41, player_4: 2 },
    "14": { player_1: 16, player_2: 29, player_3: 42, player_4: 3 },
    "15": { player_1: 17, player_2: 30, player_3: 43, player_4: 4 },
    "16": { player_1: 18, player_2: 31, player_3: 44, player_4: 5 },
    "17": { player_1: 19, player_2: 32, player_3: 45, player_4: 6 },
    "18": { player_1: 20, player_2: 33, player_3: 46, player_4: 7 },
    "19": { player_1: 21, player_2: 34, player_3: 47, player_4: 8 },
    "20": { player_1: 22, player_2: 35, player_3: 48, player_4: 9 },
    "21": { player_1: 23, player_2: 36, player_3: 49, player_4: 10 },
    "22": { player_1: 24, player_2: 37, player_3: 50, player_4: 11 },
    "23": { player_1: 25, player_2: 38, player_3: 51, player_4: 12 },
    "24": { player_1: 26, player_2: 39, player_3: 0, player_4: 13 },
    "25": { player_1: 27, player_2: 40, player_3: 1, player_4: 14 },
    "26": { player_1: 28, player_2: 41, player_3: 2, player_4: 15 },
    "27": { player_1: 29, player_2: 42, player_3: 3, player_4: 16 },
    "28": { player_1: 30, player_2: 43, player_3: 4, player_4: 17 },
    "29": { player_1: 31, player_2: 44, player_3: 5, player_4: 18 },
    "30": { player_1: 32, player_2: 45, player_3: 6, player_4: 19 },
    "31": { player_1: 33, player_2: 46, player_3: 7, player_4: 20 },
    "32": { player_1: 34, player_2: 47, player_3: 8, player_4: 21 },
    "33": { player_1: 35, player_2: 48, player_3: 9, player_4: 22 },
    "34": { player_1: 36, player_2: 49, player_3: 10, player_4: 23 },
    "35": { player_1: 37, player_2: 50, player_3: 11, player_4: 24 },
    "36": { player_1: 38, player_2: 51, player_3: 12, player_4: 25 },
    "37": { player_1: 39, player_2: 0, player_3: 13, player_4: 26 },
    "38": { player_1: 40, player_2: 1, player_3: 14, player_4: 27 },
    "39": { player_1: 41, player_2: 2, player_3: 15, player_4: 28 },
    "40": { player_1: 42, player_2: 3, player_3: 16, player_4: 29 },
    "41": { player_1: 43, player_2: 4, player_3: 17, player_4: 30 },
    "42": { player_1: 44, player_2: 5, player_3: 18, player_4: 31 },
    "43": { player_1: 45, player_2: 6, player_3: 19, player_4: 32 },
    "44": { player_1: 46, player_2: 7, player_3: 20, player_4: 33 },
    "45": { player_1: 47, player_2: 8, player_3: 21, player_4: 34 },
    "46": { player_1: 48, player_2: 9, player_3: 22, player_4: 35 },
    "47": { player_1: 49, player_2: 10, player_3: 23, player_4: 36 },
    "48": { player_1: 50, player_2: 11, player_3: 24, player_4: 37 },
    "49": { player_1: 51, player_2: 12, player_3: 25, player_4: 38 },
    "50": { player_1: 0, player_2: 13, player_3: 26, player_4: 39 },
};

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Chess {
    /*Fields*/
    colourCode: ColourCode;
    boardCode: BoardCode;
    local_id: Local_id;
    /*Constructor*/
    constructor(colourCode: ColourCode, boardCode: BoardCode, local_id: Local_id) {
        this.colourCode = colourCode;
        this.boardCode = boardCode;
        this.local_id = local_id;
    }

    /*Method*/
    canMove(dice_result: number): boolean {
        switch (this.boardCode) {
            case 0: {
                if (dice_result == 6) {
                    return true;
                } else {
                    return false;
                }
            }
            case 1: {
                return true;
            }
            case 2: {
                return true;
            }
            case 3: {
                return true;
            }
            case 4: {
                return false;
            }
            default: {
                return false;
            }
        }
    }

    moveTo(newBoardCode: BoardCode, newLocal_id: Local_id) {
        this.boardCode = newBoardCode;
        this.local_id = newLocal_id;
    }

    isFinished() {
        if (this.boardCode == 4) {
            return true;
        } else return false;
    }

    canShortcut(boardMainLocalStep: number): boolean {
        if (boardMainLocalStep == 18) {
            return true;
        } else {
            return false;
        }
    }

    flyShortcut() {
        const temp_local_id = (this.local_id + 12) % 52;
        this.moveTo(2, temp_local_id);
    }

    canJump(boardMainLocalStep: number): boolean {
        if (boardMainLocalStep == 50) {
            return false;
        }
        if (boardMainLocalStep % 4 == 2) {
            return true;
        } else {
            return false;
        }
    }

    jump() {
        const temp_local_id = (this.local_id + 4) % 52;
        this.moveTo(2, temp_local_id);
    }

    localStepToBoardMainID(step: number): number {
        const player = `player_${this.colourCode + 1}`;
        try {
            return board_main_route[step][player];
        } catch (err) {
            return 0;
        }
    }

    boardMainIDToLocalStep(): number {
        const player = `player_${this.colourCode + 1}`;
        if (this.boardCode == 2) {
            const boardMainID = this.local_id;
            for (let myKey in board_main_route) {
                if (board_main_route[myKey][player] == boardMainID) {
                    return parseInt(myKey);
                }
            }
        }
        return 0;
    }
}

class Player {
    /*Fields*/
    chessStatus: {
        0: Chess;
        1: Chess;
        2: Chess;
        3: Chess;
    };
    rollTimes: number;
    lastMoveChess: number | null;
    actionStatus: number;
    /*Constructor*/
    constructor(
        playerChess: { 0: Chess; 1: Chess; 2: Chess; 3: Chess },
        rollTimes: number,
        lastMoveChess: number | null,
        actionStatus: number
    ) {
        this.chessStatus = playerChess;
        this.rollTimes = rollTimes;
        this.lastMoveChess = lastMoveChess;
        this.actionStatus = actionStatus;
    }

    /*Method*/
    isWin(): boolean {
        let finishCount = 0;
        for (let myKey in this.chessStatus) {
            if (this.chessStatus[myKey].isFinished()) {
                finishCount += 1;
            }
        }
        if (finishCount == 4) {
            return true;
        } else {
            return false;
        }
    }

    resetRollTimes() {
        this.rollTimes = 0;
    }

    addRollTimes() {
        this.rollTimes += 1;
    }

    isSuicide(): boolean {
        if (this.rollTimes == 3) {
            return true;
        } else {
            return false;
        }
    }

    setLastMoveChess(lastMoveChessLocal_ID: number) {
        this.lastMoveChess = lastMoveChessLocal_ID;
    }

    killChess(chess_id: number) {
        this.chessStatus[chess_id].moveTo(0, chess_id);
    }

    playerCanMoveChessCodeArr(roll_number: number) {
        const myArr = [];
        for (let myKey in this.chessStatus) {
            if (this.chessStatus[myKey].canMove(roll_number)) {
                myArr.push(myKey);
            }
        }
        return myArr;
    }
}

export class AeroplaneChessGame {
    /*Fields*/
    allPlayers: {
        player_1: Player;
        player_2: Player;
        player_3: Player;
        player_4: Player;
    };
    endGame: boolean;
    winner: string;
    turn: number;
    roll_number: number;
    animationArr: apc_animation[];
    /*Constructor*/
    constructor(
        allPlayers: { player_1: Player; player_2: Player; player_3: Player; player_4: Player },
        endGame: boolean,
        winner: string,
        turn: number,
        roll_number: number
    ) {
        this.allPlayers = allPlayers;
        this.endGame = endGame;
        this.winner = winner;
        this.turn = turn;
        this.roll_number = roll_number;
        this.animationArr = [];
    }

    /* Methods */
    checkEndGame(): boolean {
        for (let myKey in this.allPlayers) {
            if (this.allPlayers[myKey].isWin()) {
                return true;
            }
        }
        return false;
    }

    setWinner() {
        for (let myKey in this.allPlayers) {
            if (this.allPlayers[myKey].isWin()) {
                this.endGame = true;
                this.winner = myKey;
            }
        }
    }

    killOtherBoardMainChess(activePlayerColourCode: ColourCode, checkBoardMainID: number) {
        const killChessArr = [];
        for (const myPlayerKey in this.allPlayers) {
            const myPlayer = this.allPlayers[myPlayerKey];
            for (const myChessKey in myPlayer.chessStatus) {
                const myChess = myPlayer.chessStatus[myChessKey];
                if (myChess.colourCode != activePlayerColourCode) {
                    if (myChess.boardCode == 2 && myChess.local_id == checkBoardMainID) {
                        myPlayer.killChess(parseInt(myChessKey));
                        killChessArr.push({
                            player: myPlayerKey,
                            chess_id: myChessKey,
                            ori_local_id: checkBoardMainID,
                        });
                    }
                }
            }
        }
        // console.log(killChessArr);
        return killChessArr;
    }

    killBoardSafeChess(activePlayerColourCode: ColourCode) {
        const killChessArr = [];
        const passivePlayerColourCode = (activePlayerColourCode + 2) % 4;
        for (const myPlayerKey in this.allPlayers) {
            const myPlayer = this.allPlayers[myPlayerKey];
            for (const myChessKey in myPlayer.chessStatus) {
                const myChess = myPlayer.chessStatus[myChessKey];
                if (myChess.colourCode == passivePlayerColourCode) {
                    if (myChess.boardCode == 3 && myChess.local_id == 3) {
                        myPlayer.killChess(parseInt(myChessKey));
                        killChessArr.push({ player: myPlayerKey, chess_id: myChessKey, ori_local_id: 3 });
                    }
                }
            }
        }
        // console.log(killChessArr);

        return killChessArr;
    }

    game_play(moveChess: { colourCode: ColourCode; chess_id: 0 | 1 | 2 | 3; moveStep: number }) {
        const gameStatus = this;
        const activePlayer = gameStatus.allPlayers[`player_${moveChess.colourCode + 1}`];
        const activeChess = activePlayer.chessStatus[moveChess.chess_id];

        this.resetAnimationArr();

        // add roll times
        if (moveChess.moveStep == 6) {
            activePlayer.addRollTimes();
            activePlayer.actionStatus = 1;
        }

        // check 3 times roll 6
        if (activePlayer.isSuicide()) {
            activePlayer.resetRollTimes();

            const lastMoveChess = activePlayer.lastMoveChess;
            if (lastMoveChess != null) {
                // start of animation part
                gameStatus.animationArr.push({
                    player: `player_${moveChess.colourCode + 1}`,
                    chess_id: lastMoveChess,
                    moving_type: "suicide",
                    currentPosition: {
                        boardCode: activePlayer.chessStatus[lastMoveChess].boardCode,
                        local_id: activePlayer.chessStatus[lastMoveChess].local_id,
                    },
                    targetPosition: { boardCode: 0, local_id: lastMoveChess },
                });
                // end of animation part

                activePlayer.killChess(lastMoveChess);
                activePlayer.setLastMoveChess(null);
            }

            activePlayer.actionStatus = 0;
            this.addTurn();
            return;
        }

        switch (activeChess.boardCode) {
            // the case for the chess in prison
            case 0: {
                if (moveChess.moveStep == 6) {
                    activeChess.moveTo(1, 0);
                    activePlayer.setLastMoveChess(moveChess.chess_id);

                    // start of animation part
                    gameStatus.animationArr.push({
                        player: `player_${moveChess.colourCode + 1}`,
                        chess_id: moveChess.chess_id,
                        moving_type: "ready",
                        currentPosition: { boardCode: 0, local_id: moveChess.chess_id },
                        targetPosition: { boardCode: 1, local_id: 0 },
                    });
                    // end of animation part
                } else {
                    activePlayer.setLastMoveChess(null);
                }
                break;
            }
            // the case for the chess in ready
            case 1: {
                const tempID = activeChess.localStepToBoardMainID(moveChess.moveStep);
                activeChess.moveTo(2, tempID);
                activePlayer.setLastMoveChess(moveChess.chess_id);

                // start of animation part

                gameStatus.animationArr.push({
                    player: `player_${moveChess.colourCode + 1}`,
                    chess_id: moveChess.chess_id,
                    moving_type: "main_move",
                    currentPosition: { boardCode: 1, local_id: 0 },
                    targetPosition: { boardCode: 2, local_id: activeChess.localStepToBoardMainID(1) },
                });

                for (let myStep = 2; myStep <= moveChess.moveStep; myStep++) {
                    gameStatus.animationArr.push({
                        player: `player_${moveChess.colourCode + 1}`,
                        chess_id: moveChess.chess_id,
                        moving_type: "main_move",
                        currentPosition: { boardCode: 2, local_id: activeChess.localStepToBoardMainID(myStep - 1) },
                        targetPosition: { boardCode: 2, local_id: activeChess.localStepToBoardMainID(myStep) },
                    });
                }

                // end of animation part

                // Check kill
                let killChessArr = gameStatus.killOtherBoardMainChess(activeChess.colourCode, activeChess.local_id);

                // start of animation part
                if (killChessArr.length > 0) {
                    for (const killChessInfo of killChessArr) {
                        // const killChess = gameStatus.allPlayers[killChessInfo.player].chessStatus[killChessInfo.chess_id];
                        // console.log(killChess);
                        gameStatus.animationArr.push({
                            player: killChessInfo.player,
                            chess_id: parseInt(killChessInfo.chess_id),
                            moving_type: "kill",
                            currentPosition: { boardCode: 2, local_id: killChessInfo.ori_local_id },
                            targetPosition: { boardCode: 0, local_id: parseInt(killChessInfo.chess_id) },
                        });
                    }
                }
                // end of animation part

                // only can jump if no kill
                // Check jump
                // if can jump then jump 4 step
                if (killChessArr.length == 0) {
                    if (activeChess.canJump(moveChess.moveStep)) {
                        activeChess.jump();

                        // start of animation part

                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "jump",
                            currentPosition: {
                                boardCode: 2,
                                local_id: activeChess.localStepToBoardMainID(moveChess.moveStep),
                            },
                            targetPosition: {
                                boardCode: 2,
                                local_id: activeChess.localStepToBoardMainID(moveChess.moveStep + 4),
                            },
                        });

                        // end of animation part

                        // check kill after jump
                        const killChessArr_jump = gameStatus.killOtherBoardMainChess(
                            activeChess.colourCode,
                            activeChess.local_id
                        );

                        // start of animation part
                        if (killChessArr_jump.length > 0) {
                            for (const killChessInfo of killChessArr_jump) {
                                // const killChess = gameStatus.allPlayers[killChessInfo.player].chessStatus[killChessInfo.chess_id];
                                // console.log(killChess);
                                gameStatus.animationArr.push({
                                    player: killChessInfo.player,
                                    chess_id: parseInt(killChessInfo.chess_id),
                                    moving_type: "kill",
                                    currentPosition: { boardCode: 2, local_id: killChessInfo.ori_local_id },
                                    targetPosition: { boardCode: 0, local_id: parseInt(killChessInfo.chess_id) },
                                });
                            }
                        }
                    }
                    // end of animation part
                }

                break;
            }
            // the case for the chess in main
            case 2: {
                const oriStep = activeChess.boardMainIDToLocalStep();
                const newStep = oriStep + moveChess.moveStep;

                // the case for case: move from main to main
                if (newStep < 51) {
                    const tempID = activeChess.localStepToBoardMainID(newStep);
                    activeChess.moveTo(2, tempID);

                    // start of animation part

                    for (let myStep = 1; myStep <= moveChess.moveStep; myStep++) {
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "main_move",
                            currentPosition: {
                                boardCode: 2,
                                local_id: activeChess.localStepToBoardMainID(oriStep + myStep - 1),
                            },
                            targetPosition: {
                                boardCode: 2,
                                local_id: activeChess.localStepToBoardMainID(oriStep + myStep),
                            },
                        });
                    }

                    // end of animation part

                    // check kill after move
                    let killMainChessArr = gameStatus.killOtherBoardMainChess(
                        activeChess.colourCode,
                        activeChess.local_id
                    );

                    // start of animation part
                    if (killMainChessArr.length > 0) {
                        for (const killChessInfo of killMainChessArr) {
                            gameStatus.animationArr.push({
                                player: killChessInfo.player,
                                chess_id: parseInt(killChessInfo.chess_id),
                                moving_type: "kill",
                                currentPosition: { boardCode: 2, local_id: killChessInfo.ori_local_id },
                                targetPosition: { boardCode: 0, local_id: parseInt(killChessInfo.chess_id) },
                            });
                        }
                    }
                    // end of animation part

                    let killSafeChessArr: any[] = [];

                    // only can jump, fly shortcut if not kill
                    if (killMainChessArr.length == 0) {
                        // Check shortcut
                        // if the chess is walk to the shortcut,
                        // then fly the the opposite and jump 4 step
                        if (activeChess.canShortcut(newStep)) {
                            activeChess.flyShortcut();

                            // start of animation part

                            gameStatus.animationArr.push({
                                player: `player_${moveChess.colourCode + 1}`,
                                chess_id: moveChess.chess_id,
                                moving_type: "shortcut",
                                currentPosition: {
                                    boardCode: 2,
                                    local_id: activeChess.localStepToBoardMainID(newStep),
                                },
                                targetPosition: {
                                    boardCode: 2,
                                    local_id: activeChess.localStepToBoardMainID(newStep + 12),
                                },
                            });

                            // end of animation part

                            // check kill during fly shortcut
                            killSafeChessArr = gameStatus.killBoardSafeChess(activeChess.colourCode);

                            // start of animation part (for killing in safe zone)

                            if (killSafeChessArr.length > 0) {
                                for (const killChessInfo of killSafeChessArr) {
                                    gameStatus.animationArr.push({
                                        player: killChessInfo.player,
                                        chess_id: parseInt(killChessInfo.chess_id),
                                        moving_type: "kill_safe",
                                        currentPosition: { boardCode: 3, local_id: killChessInfo.ori_local_id },
                                        targetPosition: { boardCode: 0, local_id: parseInt(killChessInfo.chess_id) },
                                    });
                                }
                            }

                            // end of animation part (for killing in safe zone)

                            // check kill after fly shortcut
                            killMainChessArr = gameStatus.killOtherBoardMainChess(
                                activeChess.colourCode,
                                activeChess.local_id
                            );

                            // start of animation part
                            if (killMainChessArr.length > 0) {
                                for (const killChessInfo of killMainChessArr) {
                                    gameStatus.animationArr.push({
                                        player: killChessInfo.player,
                                        chess_id: parseInt(killChessInfo.chess_id),
                                        moving_type: "kill",
                                        currentPosition: { boardCode: 2, local_id: killChessInfo.ori_local_id },
                                        targetPosition: { boardCode: 0, local_id: parseInt(killChessInfo.chess_id) },
                                    });
                                }
                            }
                            // end of animation part

                            // only can jump if not kill
                            if (killMainChessArr.length == 0 && killSafeChessArr.length == 0) {
                                activeChess.jump();

                                // start of animation part

                                gameStatus.animationArr.push({
                                    player: `player_${moveChess.colourCode + 1}`,
                                    chess_id: moveChess.chess_id,
                                    moving_type: "jump",
                                    currentPosition: {
                                        boardCode: 2,
                                        local_id: activeChess.localStepToBoardMainID(newStep + 12),
                                    },
                                    targetPosition: {
                                        boardCode: 2,
                                        local_id: activeChess.localStepToBoardMainID(newStep + 12 + 4),
                                    },
                                });

                                // end of animation part

                                // check kill after fly shortcut and jump
                                killMainChessArr = gameStatus.killOtherBoardMainChess(
                                    activeChess.colourCode,
                                    activeChess.local_id
                                );

                                // start of animation part
                                if (killMainChessArr.length > 0) {
                                    for (const killChessInfo of killMainChessArr) {
                                        gameStatus.animationArr.push({
                                            player: killChessInfo.player,
                                            chess_id: parseInt(killChessInfo.chess_id),
                                            moving_type: "kill",
                                            currentPosition: { boardCode: 2, local_id: killChessInfo.ori_local_id },
                                            targetPosition: {
                                                boardCode: 0,
                                                local_id: parseInt(killChessInfo.chess_id),
                                            },
                                        });
                                    }
                                }
                                // end of animation part
                            }
                        } else if (activeChess.canJump(newStep)) {
                            // Check jump
                            // if can jump then jump 4 step
                            activeChess.jump();

                            // start of animation part

                            gameStatus.animationArr.push({
                                player: `player_${moveChess.colourCode + 1}`,
                                chess_id: moveChess.chess_id,
                                moving_type: "jump",
                                currentPosition: {
                                    boardCode: 2,
                                    local_id: activeChess.localStepToBoardMainID(newStep),
                                },
                                targetPosition: {
                                    boardCode: 2,
                                    local_id: activeChess.localStepToBoardMainID(newStep + 4),
                                },
                            });

                            // end of animation part

                            // check kill after jump
                            killMainChessArr = gameStatus.killOtherBoardMainChess(
                                activeChess.colourCode,
                                activeChess.local_id
                            );

                            // start of animation part
                            if (killMainChessArr.length > 0) {
                                for (const killChessInfo of killMainChessArr) {
                                    gameStatus.animationArr.push({
                                        player: killChessInfo.player,
                                        chess_id: parseInt(killChessInfo.chess_id),
                                        moving_type: "kill",
                                        currentPosition: { boardCode: 2, local_id: killChessInfo.ori_local_id },
                                        targetPosition: {
                                            boardCode: 0,
                                            local_id: parseInt(killChessInfo.chess_id),
                                        },
                                    });
                                }
                            }
                            // end of animation part

                            //can jump shortcut if no kill
                            if (killMainChessArr.length == 0) {
                                // if the chess jump to shortcut start point
                                // then fly to opposite
                                if (activeChess.canShortcut(newStep + 4)) {
                                    activeChess.flyShortcut();

                                    // start of animation part
                                    gameStatus.animationArr.push({
                                        player: `player_${moveChess.colourCode + 1}`,
                                        chess_id: moveChess.chess_id,
                                        moving_type: "shortcut",
                                        currentPosition: {
                                            boardCode: 2,
                                            local_id: activeChess.localStepToBoardMainID(newStep + 4),
                                        },
                                        targetPosition: {
                                            boardCode: 2,
                                            local_id: activeChess.localStepToBoardMainID(newStep + 4 + 12),
                                        },
                                    });
                                    // end of animation part

                                    // check kill during fly shortcut
                                    killSafeChessArr = gameStatus.killBoardSafeChess(activeChess.colourCode);

                                    // start of animation part (for killing in safe zone)

                                    if (killSafeChessArr.length > 0) {
                                        for (const killChessInfo of killSafeChessArr) {
                                            gameStatus.animationArr.push({
                                                player: killChessInfo.player,
                                                chess_id: parseInt(killChessInfo.chess_id),
                                                moving_type: "kill_safe",
                                                currentPosition: { boardCode: 3, local_id: killChessInfo.ori_local_id },
                                                targetPosition: {
                                                    boardCode: 0,
                                                    local_id: parseInt(killChessInfo.chess_id),
                                                },
                                            });
                                        }
                                    }

                                    // end of animation part (for killing in safe zone)

                                    // check kill after fly shortcut
                                    killMainChessArr = gameStatus.killOtherBoardMainChess(
                                        activeChess.colourCode,
                                        activeChess.local_id
                                    );

                                    // start of animation part
                                    if (killMainChessArr.length > 0) {
                                        for (const killChessInfo of killMainChessArr) {
                                            gameStatus.animationArr.push({
                                                player: killChessInfo.player,
                                                chess_id: parseInt(killChessInfo.chess_id),
                                                moving_type: "kill",
                                                currentPosition: { boardCode: 2, local_id: killChessInfo.ori_local_id },
                                                targetPosition: {
                                                    boardCode: 0,
                                                    local_id: parseInt(killChessInfo.chess_id),
                                                },
                                            });
                                        }
                                    }
                                    // end of animation part
                                }
                            }
                        }
                    }

                    // console.log(killMainChessArr);
                    // console.log(killSafeChessArr);
                } else {
                    // case: move from main to safe zone
                    const tempID = 6 - (newStep - 50);

                    // move from main to finish
                    // for the case that the chess at step 50, and move 6,
                    // so the tempID will be 0 and finished
                    if (tempID == 0) {
                        activeChess.moveTo(4, moveChess.chess_id);
                        activePlayer.setLastMoveChess(null);

                        // start of animation part

                        // animation for safe to safe center
                        // animation for main to safe first step
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "main_move",
                            currentPosition: {
                                boardCode: 2,
                                // 50 is the last step in main
                                local_id: activeChess.localStepToBoardMainID(50),
                            },
                            targetPosition: {
                                boardCode: 3,
                                // 5 is the first step in safe
                                local_id: 5,
                            },
                        });

                        // moving in safe to center
                        for (let mySafeID = 4; mySafeID >= 0; mySafeID--) {
                            gameStatus.animationArr.push({
                                player: `player_${moveChess.colourCode + 1}`,
                                chess_id: moveChess.chess_id,
                                moving_type: "safe_move",
                                currentPosition: {
                                    boardCode: 3,
                                    local_id: mySafeID + 1,
                                },
                                targetPosition: {
                                    boardCode: 3,
                                    local_id: mySafeID,
                                },
                            });
                        }

                        // animation for safe center to finish
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "finish",
                            currentPosition: {
                                boardCode: 3,
                                local_id: 0,
                            },
                            targetPosition: {
                                boardCode: 4,
                                local_id: moveChess.chess_id,
                            },
                        });

                        // end of animation part

                        if (gameStatus.checkEndGame()) {
                            gameStatus.setWinner();
                            return;
                        }
                        return;
                    }

                    // for the case main to safe
                    activeChess.moveTo(3, tempID);

                    // start of animation part

                    // start of animation part
                    // moving in main board

                    for (let myStep = oriStep; myStep < 50; myStep++) {
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "main_move",
                            currentPosition: {
                                boardCode: 2,
                                local_id: activeChess.localStepToBoardMainID(myStep),
                            },
                            targetPosition: {
                                boardCode: 2,
                                local_id: activeChess.localStepToBoardMainID(myStep + 1),
                            },
                        });
                    }

                    // animation for main to safe first step
                    gameStatus.animationArr.push({
                        player: `player_${moveChess.colourCode + 1}`,
                        chess_id: moveChess.chess_id,
                        moving_type: "main_move",
                        currentPosition: {
                            boardCode: 2,
                            // 50 is the last step in main
                            local_id: activeChess.localStepToBoardMainID(50),
                        },
                        targetPosition: {
                            boardCode: 3,
                            // 5 is the first step in safe
                            local_id: 5,
                        },
                    });

                    // animation for safe towards safe center
                    for (let mySafeID = 4; mySafeID >= tempID; mySafeID--) {
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "safe_move",
                            currentPosition: {
                                boardCode: 3,
                                local_id: mySafeID + 1,
                            },
                            targetPosition: {
                                boardCode: 3,
                                local_id: mySafeID,
                            },
                        });
                    }
                    // end of animation part
                }

                activePlayer.setLastMoveChess(moveChess.chess_id);
                break;
            }

            // the case for the chess in safe
            case 3: {
                const ori_ID = activeChess.local_id;
                const moveStep = moveChess.moveStep;

                if (moveStep == ori_ID) {
                    // win
                    activeChess.moveTo(4, moveChess.chess_id);
                    activePlayer.setLastMoveChess(null);

                    // start of animation part
                    // animation for safe to safe center
                    for (let mySafeID = ori_ID - 1; mySafeID >= 0; mySafeID--) {
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "safe_move",
                            currentPosition: {
                                boardCode: 3,
                                local_id: mySafeID + 1,
                            },
                            targetPosition: {
                                boardCode: 3,
                                local_id: mySafeID,
                            },
                        });
                    }

                    // animation for safe center to finish
                    gameStatus.animationArr.push({
                        player: `player_${moveChess.colourCode + 1}`,
                        chess_id: moveChess.chess_id,
                        moving_type: "finish",
                        currentPosition: {
                            boardCode: 3,
                            local_id: 0,
                        },
                        targetPosition: {
                            boardCode: 4,
                            local_id: moveChess.chess_id,
                        },
                    });

                    // end of animation part

                    if (gameStatus.checkEndGame()) {
                        gameStatus.setWinner();
                        return;
                    }
                } else if (moveStep < ori_ID) {
                    // move toward center
                    activeChess.moveTo(3, ori_ID - moveStep);
                    activePlayer.setLastMoveChess(moveChess.chess_id);

                    // start of animation part
                    // animation for safe towards safe center
                    for (let mySafeID = ori_ID - 1; mySafeID >= ori_ID - moveStep; mySafeID--) {
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "safe_move",
                            currentPosition: {
                                boardCode: 3,
                                local_id: mySafeID + 1,
                            },
                            targetPosition: {
                                boardCode: 3,
                                local_id: mySafeID,
                            },
                        });
                    }
                    // end of animation part
                } else {
                    // bounce back
                    activeChess.moveTo(3, moveStep - ori_ID);
                    activePlayer.setLastMoveChess(moveChess.chess_id);

                    // start of animation part
                    // animation for safe to safe center
                    for (let mySafeID = ori_ID - 1; mySafeID >= 0; mySafeID--) {
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "safe_move",
                            currentPosition: {
                                boardCode: 3,
                                local_id: mySafeID + 1,
                            },
                            targetPosition: {
                                boardCode: 3,
                                local_id: mySafeID,
                            },
                        });
                    }

                    // animation for bounce back
                    for (let mySafeID = 0; mySafeID < moveStep - ori_ID; mySafeID++) {
                        gameStatus.animationArr.push({
                            player: `player_${moveChess.colourCode + 1}`,
                            chess_id: moveChess.chess_id,
                            moving_type: "safe_move_bounce",
                            currentPosition: {
                                boardCode: 3,
                                local_id: mySafeID,
                            },
                            targetPosition: {
                                boardCode: 3,
                                local_id: mySafeID + 1,
                            },
                        });
                    }
                }

                break;
            }
            default: {
                activePlayer.setLastMoveChess(null);
            }
        }

        if (moveChess.moveStep != 6) {
            activePlayer.resetRollTimes();
            activePlayer.actionStatus = 0;
            this.addTurn();
        }
    }

    addTurn() {
        this.turn = this.turn + 1;
        const currentPlayer = this.allPlayers[`player_${this.moveColourCode() + 1}`];
        currentPlayer.actionStatus = 1;
    }

    rollDice() {
        this.resetAnimationArr();
        const x = randomIntFromInterval(1, 6);
        this.roll_number = x;
        const currentPlayer = this.allPlayers[`player_${this.moveColourCode() + 1}`];
        if (currentPlayer.playerCanMoveChessCodeArr(this.roll_number).length == 0) {
            currentPlayer.actionStatus = 0;
            this.addTurn();
        } else {
            currentPlayer.actionStatus = 2;
        }
        return this.roll_number;
    }

    rollDiceMust(targetRollNumber: number) {
        this.resetAnimationArr();
        // const x = randomIntFromInterval(1, 6);
        const x = targetRollNumber;
        this.roll_number = x;
        const currentPlayer = this.allPlayers[`player_${this.moveColourCode() + 1}`];
        if (currentPlayer.playerCanMoveChessCodeArr(this.roll_number).length == 0) {
            currentPlayer.actionStatus = 0;
            this.addTurn();
        } else {
            currentPlayer.actionStatus = 2;
        }
        return this.roll_number;
    }

    moveColourCode() {
        return (this.turn - 1) % 4;
    }

    resetAnimationArr() {
        this.animationArr = [];
    }
}

export function initChessStatus() {
    let initPlayer_1 = new Player(
        {
            0: new Chess(0, 0, 0),
            1: new Chess(0, 0, 1),
            2: new Chess(0, 0, 2),
            3: new Chess(0, 0, 3),
        },
        0,
        null,
        1
    );

    let initPlayer_2 = new Player(
        {
            0: new Chess(1, 0, 0),
            1: new Chess(1, 0, 1),
            2: new Chess(1, 0, 2),
            3: new Chess(1, 0, 3),
        },
        0,
        null,
        0
    );

    let initPlayer_3 = new Player(
        {
            0: new Chess(2, 0, 0),
            1: new Chess(2, 0, 1),
            2: new Chess(2, 0, 2),
            3: new Chess(2, 0, 3),
        },
        0,
        null,
        0
    );

    let initPlayer_4 = new Player(
        {
            0: new Chess(3, 0, 0),
            1: new Chess(3, 0, 1),
            2: new Chess(3, 0, 2),
            3: new Chess(3, 0, 3),
        },
        0,
        null,
        0
    );

    let initGameStatus = new AeroplaneChessGame(
        {
            player_1: initPlayer_1,
            player_2: initPlayer_2,
            player_3: initPlayer_3,
            player_4: initPlayer_4,
        },
        false,
        "",
        1,
        1
    );

    return initGameStatus;
}

export function generateAPC(gameStatus: GameStatus) {
    const myPlayer_1 = gameStatus.allPlayers.player_1;
    const p1c = myPlayer_1.chessStatus;
    let genPlayer_1 = new Player(
        {
            0: new Chess(p1c[0].colourCode, p1c[0].boardCode, p1c[0].local_id),
            1: new Chess(p1c[1].colourCode, p1c[1].boardCode, p1c[1].local_id),
            2: new Chess(p1c[2].colourCode, p1c[2].boardCode, p1c[2].local_id),
            3: new Chess(p1c[3].colourCode, p1c[3].boardCode, p1c[3].local_id),
        },
        myPlayer_1.rollTimes,
        myPlayer_1.lastMoveChess,
        myPlayer_1.actionStatus
    );

    const myPlayer_2 = gameStatus.allPlayers.player_2;
    const p2c = myPlayer_2.chessStatus;
    let genPlayer_2 = new Player(
        {
            0: new Chess(p2c[0].colourCode, p2c[0].boardCode, p2c[0].local_id),
            1: new Chess(p2c[1].colourCode, p2c[1].boardCode, p2c[1].local_id),
            2: new Chess(p2c[2].colourCode, p2c[2].boardCode, p2c[2].local_id),
            3: new Chess(p2c[3].colourCode, p2c[3].boardCode, p2c[3].local_id),
        },
        myPlayer_2.rollTimes,
        myPlayer_2.lastMoveChess,
        myPlayer_2.actionStatus
    );

    const myPlayer_3 = gameStatus.allPlayers.player_3;
    const p3c = myPlayer_3.chessStatus;
    let genPlayer_3 = new Player(
        {
            0: new Chess(p3c[0].colourCode, p3c[0].boardCode, p3c[0].local_id),
            1: new Chess(p3c[1].colourCode, p3c[1].boardCode, p3c[1].local_id),
            2: new Chess(p3c[2].colourCode, p3c[2].boardCode, p3c[2].local_id),
            3: new Chess(p3c[3].colourCode, p3c[3].boardCode, p3c[3].local_id),
        },
        myPlayer_3.rollTimes,
        myPlayer_3.lastMoveChess,
        myPlayer_3.actionStatus
    );

    const myPlayer_4 = gameStatus.allPlayers.player_4;
    const p4c = myPlayer_4.chessStatus;
    let genPlayer_4 = new Player(
        {
            0: new Chess(p4c[0].colourCode, p4c[0].boardCode, p4c[0].local_id),
            1: new Chess(p4c[1].colourCode, p4c[1].boardCode, p4c[1].local_id),
            2: new Chess(p4c[2].colourCode, p4c[2].boardCode, p4c[2].local_id),
            3: new Chess(p4c[3].colourCode, p4c[3].boardCode, p4c[3].local_id),
        },
        myPlayer_4.rollTimes,
        myPlayer_4.lastMoveChess,
        myPlayer_4.actionStatus
    );

    let initGameStatus = new AeroplaneChessGame(
        {
            player_1: genPlayer_1,
            player_2: genPlayer_2,
            player_3: genPlayer_3,
            player_4: genPlayer_4,
        },
        gameStatus.endGame,
        gameStatus.winner,
        gameStatus.turn,
        gameStatus.roll_number
    );

    return initGameStatus;
}

// let myTestGame = initChessStatus();
// myTestGame.allPlayers.player_2.chessStatus[0].boardCode = 2;
// myTestGame.allPlayers.player_2.chessStatus[0].local_id = 3;
// myTestGame.allPlayers.player_2.chessStatus[2].boardCode = 2;
// myTestGame.allPlayers.player_2.chessStatus[2].local_id = 3;
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 6 });
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 1 });
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 2 });

// myTestGame.allPlayers.player_3.chessStatus[1].boardCode = 2;
// myTestGame.allPlayers.player_3.chessStatus[1].local_id = 51;
// myTestGame.allPlayers.player_3.chessStatus[3].boardCode = 2;
// myTestGame.allPlayers.player_3.chessStatus[3].local_id = 51;
// myTestGame.game_play({ colourCode: 3, chess_id: 0, moveStep: 6 });
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 1 });
// myTestGame.game_play({ colourCode: 3, chess_id: 0, moveStep: 6 });

// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 6 });
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 1 });
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 2 });
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 4 });

// try move forward
// myTestGame.allPlayers.player_1.chessStatus[0].boardCode = 3;
// myTestGame.allPlayers.player_1.chessStatus[0].local_id = 5;
// myTestGame.allPlayers.player_4.chessStatus[3].boardCode = 3;
// myTestGame.allPlayers.player_4.chessStatus[3].local_id = 4;

// // try bounce back
// myTestGame.allPlayers.player_2.chessStatus[0].boardCode = 3;
// myTestGame.allPlayers.player_2.chessStatus[0].local_id = 3;
// myTestGame.allPlayers.player_3.chessStatus[3].boardCode = 3;
// myTestGame.allPlayers.player_3.chessStatus[3].local_id = 4;

// // test win
// myTestGame.allPlayers.player_2.chessStatus[1].boardCode = 3;
// myTestGame.allPlayers.player_2.chessStatus[1].local_id = 5;
// myTestGame.allPlayers.player_3.chessStatus[2].boardCode = 3;
// myTestGame.allPlayers.player_3.chessStatus[2].local_id = 4;

// console.log(myTestGame);
// console.log("hihihi");
// console.log("hihihi");

// // //test prison to ready
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 6 });
// myTestGame.game_play({ colourCode: 1, chess_id: 1, moveStep: 6 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 4 });
// myTestGame.game_play({ colourCode: 3, chess_id: 3, moveStep: 6 });

// //test ready to main
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 2 });
// myTestGame.game_play({ colourCode: 1, chess_id: 1, moveStep: 6 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 3 });
// myTestGame.game_play({ colourCode: 3, chess_id: 3, moveStep: 6 });

// //test main to main
// myTestGame.game_play({ colourCode: 0, chess_id: 0, moveStep: 2 });
// myTestGame.game_play({ colourCode: 1, chess_id: 1, moveStep: 6 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 3 });
// myTestGame.game_play({ colourCode: 3, chess_id: 3, moveStep: 5 });

// // test win game
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 6 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 0, moveStep: 5 });

// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 6 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 1, moveStep: 5 });

// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 6 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 2, moveStep: 5 });

// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 6 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });
// myTestGame.game_play({ colourCode: 2, chess_id: 3, moveStep: 5 });

// console.log("bianca");
// console.log(JSON.stringify(myTestGame));

// let a = initChessStatus();
// console.log(JSON.stringify(a));

// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())
// console.log(a.roll_number)
// console.log(a.rollDice())

// let b: GameStatus = {
//     allPlayerChess: {
//         player_1: {
//             chessStatus: {
//                 0: { colourCode: 0, boardCode: 2, local_id: 14 },
//                 1: { colourCode: 0, boardCode: 1, local_id: 1 },
//                 2: { colourCode: 0, boardCode: 3, local_id: 22 },
//                 3: { colourCode: 0, boardCode: 1, local_id: 3 },
//             },
//             rollTimes: 1,
//             lastMoveChess: 0,
//         },
//         player_2: {
//             chessStatus: {
//                 0: { colourCode: 1, boardCode: 3, local_id: 50 },
//                 1: { colourCode: 1, boardCode: 2, local_id: 31 },
//                 2: { colourCode: 1, boardCode: 1, local_id: 62 },
//                 3: { colourCode: 1, boardCode: 4, local_id: 31 },
//             },
//             rollTimes: 0,
//             lastMoveChess: 1,
//         },
//         player_3: {
//             chessStatus: {
//                 0: { colourCode: 2, boardCode: 1, local_id: 56 },
//                 1: { colourCode: 2, boardCode: 2, local_id: 15 },
//                 2: { colourCode: 2, boardCode: 2, local_id: 23 },
//                 3: { colourCode: 2, boardCode: 2, local_id: 36 },
//             },
//             rollTimes: 0,
//             lastMoveChess: null,
//         },
//         player_4: {
//             chessStatus: {
//                 0: { colourCode: 3, boardCode: 1, local_id: 3 },
//                 1: { colourCode: 3, boardCode: 2, local_id: 71 },
//                 2: { colourCode: 3, boardCode: 3, local_id: 28 },
//                 3: { colourCode: 3, boardCode: 3, local_id: 53 },
//             },
//             rollTimes: 0,
//             lastMoveChess: null,
//         },
//     },
//     endGame: true,
//     winner: "player1",
// };

// let c = generateAPC(b);
// console.log(JSON.stringify(c));

// let d = {
//     allPlayers: {
//         player_1: {
//             chessStatus: {
//                 "0": { colourCode: 0, boardCode: 2, local_id: 14 },
//                 "1": { colourCode: 0, boardCode: 1, local_id: 1 },
//                 "2": { colourCode: 0, boardCode: 3, local_id: 22 },
//                 "3": { colourCode: 0, boardCode: 1, local_id: 3 },
//             },
//             rollTimes: 1,
//             lastMoveChess: 0,
//         },
//         player_2: {
//             chessStatus: {
//                 "0": { colourCode: 1, boardCode: 3, local_id: 50 },
//                 "1": { colourCode: 1, boardCode: 2, local_id: 31 },
//                 "2": { colourCode: 1, boardCode: 1, local_id: 62 },
//                 "3": { colourCode: 1, boardCode: 4, local_id: 31 },
//             },
//             rollTimes: 0,
//             lastMoveChess: 1,
//         },
//         player_3: {
//             chessStatus: {
//                 "0": { colourCode: 2, boardCode: 1, local_id: 56 },
//                 "1": { colourCode: 2, boardCode: 2, local_id: 15 },
//                 "2": { colourCode: 2, boardCode: 2, local_id: 23 },
//                 "3": { colourCode: 2, boardCode: 2, local_id: 36 },
//             },
//             rollTimes: 0,
//             lastMoveChess: null,
//         },
//         player_4: {
//             chessStatus: {
//                 "0": { colourCode: 3, boardCode: 1, local_id: 3 },
//                 "1": { colourCode: 3, boardCode: 2, local_id: 71 },
//                 "2": { colourCode: 3, boardCode: 3, local_id: 28 },
//                 "3": { colourCode: 3, boardCode: 3, local_id: 53 },
//             },
//             rollTimes: 0,
//             lastMoveChess: null,
//         },
//     },
//     endGame: true,
//     winner: "player1",
// };
