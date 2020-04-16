var pageWidth = window.innerWidth || document.body.clientWidth;
var treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;
var canMove = true;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
const gestureZone = document.getElementById('canvas-container');

gestureZone.addEventListener('touchstart', function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);

function resetMovement() {
    canMove = false;
    setTimeout(function () {
        canMove = true;
    }, 150);
}

function handleGesture(e) {
    e.preventDefault;
    var x = touchendX - touchstartX;
    var y = touchendY - touchstartY;
    var xy = Math.abs(x / y);
    var yx = Math.abs(y / x);
    gameOver = gameIsOver();
    if (gameOver) {
        fadeCanvas();
    } else if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (yx <= limit) {
            if (x < 0) {
                if (canMove) {
                    move("left");
                    resetMovement();
                }
            } else {
                if (canMove) {
                    move("right");
                    resetMovement();
                }
            }
        }
        if (xy <= limit) {
            if (y < 0) {
                if (canMove) {
                    move("up");
                    resetMovement();
                }
            } else {
                if (canMove) {
                    move("down");
                    resetMovement();
                }
            }
        }
    }
    setTimeout(function () {
        for (var i = 0; i < SIZE; i++) {
            for (var j = 0; j < SIZE; j++) {
                mergedTiles[i][j] = null;
            }
        }
    }, TIMEOUT_SPEED / 4);
    if (moved) {
        setTimeout(function () {
            addRandomPiece(board, 1)
            moved = false;
        }, TIMEOUT_SPEED);
    }

}

newGameButton.addEventListener("click", function () {
    gameStart();
});

window.addEventListener("keydown", function (event) {
    gameOver = gameIsOver();
    if (gameOver) {
        fadeCanvas();
    } else {
        switch (event.key) {
            case "ArrowRight":
                if (canMove) {
                    move("right");
                    resetMovement();
                }
                break;
            case "ArrowLeft":
                if (canMove) {
                    move("left");
                    resetMovement();
                }
                break;
            case "ArrowUp":
                if (canMove) {
                    move("up");
                    resetMovement();
                }
                break;
            case "ArrowDown":
                if (canMove) {
                    move("down");
                    resetMovement();
                }
                break;
        }
        setTimeout(function () {
            for (var i = 0; i < SIZE; i++) {
                for (var j = 0; j < SIZE; j++) {
                    mergedTiles[i][j] = null;
                }
            }
        }, TIMEOUT_SPEED / 4);
        if (moved) {
            setTimeout(function () {
                addRandomPiece(board, 1)
                moved = false;
            }, TIMEOUT_SPEED);
        }
    }
});

