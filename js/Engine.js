const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = document.getElementById("canvas-container").offsetWidth;
canvas.height = canvas.width;
const SIZE = 4;
const TIMEOUT_SPEED = 150;
var board = new Board(canvas, SIZE);
var tiles = board.tiles;
var pieceId = 0;
var score = 0;
var moved = false;
var newGameButton = document.getElementById("new-game-button");
var mergedTiles = [];
var canvasOpacity = 1;
var gameOver = false;
var images = loadImages();

var loop = function () {
    var t = new Date().getTime();
    var delta = t - lastUpdate;
    update(delta);
    render();
    lastUpdate = new Date().getTime();
    window.requestAnimationFrame(loop);
}
lastUpdate = new Date().getTime();
gameStart();

function fadeCanvas() {
    if (canvasOpacity <= 1 && canvasOpacity > 0 && gameOver) {
        canvasOpacity -= .05;
        setTimeout(function () { fadeCanvas() }, 10);
    }
    document.getElementById("canvas-container").style.opacity = canvasOpacity;
}

function gameStart() {
    gameOver = false;
    canvasOpacity = 1;
    document.getElementById("canvas-container").style.opacity = canvasOpacity;
    board = new Board(canvas, SIZE);
    tiles = board.tiles;
    score = 0;
    document.getElementById("score").innerHTML = score;

    mergedTiles = new Array(SIZE);
    for (var i = 0; i < SIZE; i++) {
        mergedTiles[i] = new Array(SIZE);
    }
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            mergedTiles[j][i] = null;
        }
    }
    addRandomPiece(board, 2);
}

var update = function () {
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (mergedTiles[j][i] != null) {
                mergedTiles[j][i].update();
            }
            if (tiles[j][i] != null) {
                tiles[j][i].update();
            }
        }
    }
}

var render = function () {
    context.clearRect(0, 0, 300, 300)
    board.render();
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (mergedTiles[j][i] !== null) {
                mergedTiles[j][i].render(context);
            }
            if (tiles[j][i] !== null) {
                tiles[j][i].render(context);
            }
        }
    }
}

function gameIsOver() {
    if (board.boardIsFull()) {
        gameOver = true;
        for (var i = 0; i < SIZE - 1; i++) {
            for (var j = 0; j < SIZE - 1; j++) {
                if (tiles[i + 1][j].value === tiles[i][j].value
                    || tiles[i][j + 1].value === tiles[i][j].value
                    || tiles[i + 1][j + 1].value === tiles[i + 1][j].value
                    || tiles[i + 1][j + 1].value === tiles[i][j + 1].value) {
                    gameOver = false;
                }
            }
        }
        return gameOver;
    }
}

function addRandomPiece(board, pieces) {
    var piecesPlaced = 0;
    while (piecesPlaced < pieces) {
        var value = 2
        if (Math.floor(Math.random() * 10) === 0) {
            value = 4;
        }
        var x = Math.floor(Math.random() * SIZE);
        var y = Math.floor(Math.random() * SIZE);
        if (tiles[x][y] === null) {
            var piece = new Piece(value, board, y, x, ++pieceId, images);
            tiles[x][y] = piece;
            piecesPlaced++;
        }
    }
}


//Rotates the board, then rearranges each row, then animates each row, then rotates back to the original position
function move(direction) {
    board.rotate(direction);
    for (var i = 0; i < SIZE; i++) {
        hasMoved(tiles[i]);
        tiles[i] = rearrange(tiles[i], mergedTiles[i]);
        tiles[i] = slide(tiles[i], mergedTiles[i], direction);
    }
    board.rotateBack(direction);
}

//Cheks if any piece on the board was able to move
function hasMoved(row) {
    for (var j = SIZE - 1; j > 0; j--) {
        if (row[j] === null && row[j - 1] !== null) {
            moved = true;
        } else if (row[j] !== null && row[j - 1] !== null && row[j].value === row[j - 1].value) {
            moved = true;
        }
    }
}

function rearrange(row, mergedRow) {
    row = sort(row);
    for (var j = row.length - 2; j >= 0; j--) {
        if (row[j] != null && row[j + 1] != null && row[j].value === row[j + 1].value) {
            row[j + 1].multiply = true;
            score += row[j + 1].value * 2;
            document.getElementById("score").innerHTML = score;
            mergedRow[j] = row[j];
            mergedRow[j].id = row[j + 1].id;
            row[j] = null;
        }
    }
    row = sort(row);
    return row;
}

function slide(row, mergedRow, direction) {
    for (var j = SIZE - 1; j >= 0; j--) {
        if (row[j] != null) {
            switch (direction) {
                case "right":
                    row[j].nextX = j * board.width / SIZE;
                    break;
                case "down":
                    row[j].nextY = j * board.width / SIZE;
                    break;
                case "left":
                    row[j].nextX = ((j - (SIZE - 1)) * -1) * board.width / SIZE;
                    break;
                case "up":
                    row[j].nextY = ((j - (SIZE - 1)) * -1) * board.width / SIZE;
                    break;
            }
        }
    }
    for (var j = SIZE - 1; j >= 0; j--) {
        if (mergedRow[j] != null) {
            console.log("merged row not null")
            for (var k = 0; k < SIZE; k++) {
                if (row[k] !== null && mergedRow[j].id === row[k].id) {
                    mergedRow[j].nextX = row[k].nextX;
                    mergedRow[j].nextY = row[k].nextY;
                    console.log("adjusted values")
                }
            }
        }
    }
    return row;
}

function sort(row) {
    nulls = row.filter(function (value) {
        return value === null;
    });
    pieces = row.filter(function (value) {
        return value !== null;
    });
    return nulls.concat(pieces);
}

document.addEventListener("DOMContentLoaded", function(){
})