// 1st strategy
// random choose

function shuffle(arr) {
    let currentIndex = arr.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
}

autoPlay = function strategy1(my_gameStatus, my_colour_code, my_movableChessArr) {
    const shuffleArr = shuffle(my_movableChessArr);
    const myAutoChosenChess = parseInt(my_movableChessArr[0]);
    return myAutoChosenChess;
}

// end of 1st strategy

// 2nd strategy
// finish one chess first
autoPlay = function strategy2(my_gameStatus, my_colour_code, my_movableChessArr) {
    const myAutoChosenChess = parseInt(my_movableChessArr[0]);
    return myAutoChosenChess;
}

// end of 2nd strategy

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
}

// end of 3rd strategy

// 4th strategy
// finish one chess first
// if six out prison
// dont move main zone chess prior to safe zone chess
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
            continue;
        }
        if (myChessStatus[myKey].boardCode == 2) {
            return parseInt(myKey);
        }
    }
    const myAutoChosenChess = parseInt(my_movableChessArr[0]);
    return myAutoChosenChess;
}

// end of 4th strategy
