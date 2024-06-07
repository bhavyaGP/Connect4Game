
var playerRed = "R"
var playerYellow = "Y"
var currPlayer = playerRed
var Gameover = false

var currColumn = [5, 5, 5, 5, 5, 5, 5]

var board;
var row = 6;
var columns = 7;

window.onload = function () {
    setGame()
}

function setGame() {
    board = []

    for (let r = 0; r < row; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            //js
            row.push(" ");

            //html
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            //<div id="0-0" class="tile"></div>
            tile.classList.add("tile")

            tile.addEventListener("click", setTile)

            document.getElementById("board").append(tile)

        }
        board.push(row)
    }

}


function setTile() {
    if (Gameover)
        return

    let coords = this.id.split("-")
    let r = parseInt(coords[0])
    let c = parseInt(coords[1])

    r = currColumn[c]
    if (r < 0)
        return

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString())
    if (currPlayer == playerRed) {
        tile.classList.add("red-tile")
        currPlayer = playerYellow
    }
    else {
        tile.classList.add("yellow-tile")
        currPlayer = playerRed
    }
    r = r - 1; //updating row height

    currColumn[c] = r


    checkwinner()
}


function checkwinner() {

    //horizontal check
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //vertical check
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < row - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < row - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < row; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}


function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins🌟";
    } else {
        winner.innerText = "Yellow Wins🌟";
    }
    gameOver = true;
}