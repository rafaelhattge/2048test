/**
 * 
 * @param {number} value The value of the piece (2, 4, 8, 16, 32, 124, 256, 512, 1024, 2048)
 * @param {object} board The board where the piece is going to be displayed
 * @param {number} x The horizontal starting position 
 * @param {number} y The vertical starting position
 */
function Piece(value, board, x, y, id, images) {
    this.value = value;
    this.board = board;
    this.size = board.width / board.size / 2;
    this.x = x * board.width / board.size;
    this.y = y * board.width / board.size;
    this.nextX = this.x;
    this.nextY = this.y;
    this.multiply = false;
    this.grow = false;
    this.merge = false;
    this.id = id;
    this.images = images;
}

Piece.prototype.update = function () {
    //Update piece position
    if (this.y < this.nextY) {
        this.y += Math.ceil((this.nextY - this.y) / 3);
        if (this.y > this.nextY) {
            this.y = this.nextY;
        }
    } else if (this.y > this.nextY) {
        this.y -= Math.ceil((this.y - this.nextY) / 3);
        if (this.y < this.nextY) {
            this.y = this.nextY;
        }
    }
    if (this.x < this.nextX) {
        this.x += Math.ceil((this.nextX - this.x)) / 3;
        if (this.x > this.nextX) {
            this.x = this.nextX;
        }
    } else if (this.x > this.nextX) {
        this.x -= Math.ceil((this.x - this.nextX)) / 3;
        if (this.x < this.nextX) {
            this.x = this.nextX;
        }
    }

    //Scale piece when multiplied
    if (this.multiply) {
        this.value *= 2;
        this.grow = true;
    }
    if (this.grow && this.size < this.board.width / this.board.size * 1.1) {
        this.size += board.size;
        this.x -= board.size;
        this.y -= board.size;
    } else {
        this.grow = false;
    }
    if (this.size >= this.board.width / board.size && this.grow == false) {
        this.size -= board.size;
        // this.x += board.size;
        // this.y += board.size;
    } else {
        this.multiply = false;
    }

    //Scale piece on creation
    if (this.size < board.width / board.size) {
        this.size += (board.width / board.size - this.size) / 5;
        // this.render(context);
    }
}

Piece.prototype.render = function () {
    var value = this.value;
    var self = this;
    window.onload = drawPiece(self.x + 5, self.y + 5, self.size - 10, self.size - 10, value, self.size, self.id, self.images);
}

function round(val) {
    return (Math.round(val * 100) / 100).toFixed(2);
}

function drawPiece(x, y, w, h, value, size, id, images) {
    radius = w / 20;
    var r = x + w;
    var b = y + h;
    var fillStyle;
    var textStyle = "#776e65";
    var textX;
    var textY;
    var textSize;
    var size = size;

    if (this.images.length > 0) {
        var image = new Image(w, h);
        for (var i = 1; i <= this.images.length; i++) {
            if (value === Math.pow(2, i)) {
                image.src = images[i - 1];
            }
        }
        context.drawImage(image, x, y, w, h);
    } else {
        context.beginPath();
        switch (value) {
            case 2:
                fillStyle = "#eee4da";
                textSize = size / 2;
                textX = x + size / 3;
                textY = y + size / 1.6;
                break;
            case 4:
                fillStyle = "#ede0c8";
                textSize = size / 2;
                textX = x + size / 3;
                textY = y + size / 1.6;
                break;
            case 8:
                fillStyle = "#f2b179";
                textStyle = "#f9f6f2";
                textSize = size / 2;
                textX = x + size / 3.2;
                textY = y + size / 1.6;
                break;
            case 16:
                fillStyle = "#f59563";
                textStyle = "#f9f6f2";
                textSize = size / 2;
                textX = x + size / 6;
                textY = y + size / 1.6;
                break;
            case 32:
                fillStyle = "#f67c5f";
                textStyle = "#f9f6f2";
                textSize = size / 2;
                textX = x + size / 5.1;
                textY = y + size / 1.6;
                break;
            case 64:
                fillStyle = "#f65e3b";
                textStyle = "#f9f6f2";
                textSize = size / 2;
                textX = x + size / 5.5;
                textY = y + size / 1.6;
                break;
            case 128:
                fillStyle = "#edcf72";
                textStyle = "#f9f6f2";
                textSize = size / 3;
                textX = x + size / 6;
                textY = y + size / 1.75;
                break;
            case 256:
                fillStyle = "#edcc61";
                textStyle = "#f9f6f2";
                textSize = size / 3;
                textX = x + size / 5.4;
                textY = y + size / 1.75;
                context.shadowColor = "#edcc61";
                context.shadowBlur = 12;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                break;
            case 512:
                fillStyle = "#edc850";
                textStyle = "#f9f6f2";
                textSize = size / 3;
                textX = x + size / 5.7;
                textY = y + size / 1.75;
                context.shadowColor = "#edc850";
                context.shadowBlur = 12;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                break;
            case 1024:
                fillStyle = "#edc53f";
                textStyle = "#f9f6f2";
                textSize = size / 3.2;
                textX = x + size / 9;
                textY = y + size / 1.8;
                context.shadowColor = "#edc53f";
                context.shadowBlur = 12;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                break;
            case 2048:
                fillStyle = "#edc850";
                textStyle = "#f9f6f2";
                textSize = size / 3.2;
                textX = x + size / 8.5;
                textY = y + size / 1.8;
                context.shadowColor = "#edc22e";
                context.shadowBlur = 12;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                break;
            default:
                fillStyle = "#edc22e";

        }
        context.lineWidth = "4";
        context.fillStyle = fillStyle;
        context.moveTo(x + radius, y);
        context.lineTo(r - radius, y);
        context.quadraticCurveTo(r, y, r, y + radius);
        context.lineTo(r, y + h - radius);
        context.quadraticCurveTo(r, b, r - radius, b);
        context.lineTo(x + radius, b);
        context.quadraticCurveTo(x, b, x, b - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.fill();

        context.shadowColor = "transparent";
        context.fillStyle = textStyle;
        context.font = textSize + 'px Arial';
        context.fillText(value, textX, textY);

    }
    // context.fillStyle = textStyle;
    // context.font = textSize / 4 + 'px Arial';
    // context.fillText(id, textX, textY + 20);
}