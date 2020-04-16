function Board(canvas, size) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.width;
    this.size = size;
    this.tiles = this.createTiles();
}

Board.prototype.createTiles = function () {
    var array = new Array(this.size);
    for (var i = 0; i < this.size; i++) {
        array[i] = new Array(this.size);
    }
    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            array[j][i] = null;
        }
    }
    return array;
}

Board.prototype.boardIsFull = function () {
    var isFull = true;
    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            if (this.tiles[i][j] == null) {
                isFull = false;
            }
        }
    }
    // console.log("isFull? " + isFull);
    return isFull;
}

Board.prototype.render = function () {
    this.context.beginPath();
    this.context.rect
    this.context.fillStyle = "#ccc0b3";
    this.context.fillRect(0, 0, this.width, this.height);
    drawBoard();
}

Board.prototype.rotate = function(direction) {
    if (direction === "left") {
        rotateCounterClockwise(this.tiles);
        rotateCounterClockwise(this.tiles);
    } else if (direction === "up") {
        rotateClockwise(this.tiles);
    } else if (direction === "down") {
        rotateCounterClockwise(tiles);
    }
}

Board.prototype.rotateBack = function(direction) {
    if (direction === "left") {
        rotateCounterClockwise(this.tiles);
        rotateCounterClockwise(this.tiles);
    } else if (direction === "up") {
        rotateCounterClockwise(this.tiles);
    } else if (direction === "down") {
        rotateClockwise(this.tiles);
    }
}

function rotateClockwise(array) {
    var size = array.length;
    for (var i = 0; i < size / 2; i++) {
        for (var j = i; j < size - i - 1; j++) {
            var temp = array[i][j];
            array[i][j] = array[size - j - 1][i];
            array[size - j - 1][i] = array[size - i - 1][size - j - 1];
            array[size - i - 1][size - j - 1] = array[j][size - i - 1];
            array[j][size - i - 1] = temp;
        }
    }
    return true
}

function rotateCounterClockwise(array) {
    var size = array.length;
    for (var i = 0; i < size / 2; i++) {
        for (var j = i; j < size - i - 1; j++) {
            var tmp = array[i][j];
            array[i][j] = array[j][size - i - 1];
            array[j][size - i - 1] = array[size - i - 1][size - j - 1];
            array[size - i - 1][size - j - 1] = array[size - j - 1][i];
            array[size - j - 1][i] = tmp;
        }
    }
    return false
}

function mirrorHorizontal(array) {
    for (var i = 0; i < array.length; i++) {
        array[i].reverse();
    }
}

function drawBoard() {
    for (var i = 0; i <= board.width; i += board.width / board.size) {
        context.moveTo(i, 1);
        context.lineTo(i, board.width);
    }

    for (var i = 0; i <= board.height; i += board.width / board.size) {
        context.moveTo(1, i);
        context.lineTo(board.width, i);
    }
    context.strokeStyle = "#bbada0";
    context.lineWidth = board.width / 30;
    context.stroke();
}