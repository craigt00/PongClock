import { DrawElements } from "./drawelements.js";

class PongClock {
    constructor(drawElements) {
        this._drawElements = drawElements;

        this._leftBatY = drawElements.canvas.height / 2 - 25;
        this._rightBatY = drawElements.canvas.height / 2 - 25;

        this.resetBall();
        this.setScore();
    }

    resetBall() {
        this._ballInfo = {
            x: drawElements.canvas.width / 2,
            y: drawElements.canvas.height / 2,
            vx: -2,
            vy: -2
        }
    }

    setScore() {
        let now = new Date();

        this.leftScore = now.getHours();
        this.rightScore = now.getMinutes();
    }

    update() {
        let now = new Date();
        let rightShouldMiss = this.leftScore !== now.getHours();
        let leftShouldMiss = !rightShouldMiss && (this.rightScore !== now.getMinutes());

        this._updateBall(rightShouldMiss, leftShouldMiss);
        this._updateRightBat(rightShouldMiss);
        this._updateLeftBat(leftShouldMiss);
        this._checkIfPointWon();
        this._drawScreen();
    }

    _updateBall(rightShouldMiss, leftShouldMiss) {
        this._ballInfo.x += this._ballInfo.vx;
        
        if ((!leftShouldMiss && this._ballInfo.x < 20) ||
            (!rightShouldMiss && this._ballInfo.x > this._drawElements.canvas.width - 30)) {
            this._ballInfo.vx = -this._ballInfo.vx;
        }
        
        this._ballInfo.y += this._ballInfo.vy;

        if (this._ballInfo.y < 10 || this._ballInfo.y > this._drawElements.canvas.height - 20) {
            this._ballInfo.vy = -this._ballInfo.vy;
        }
    }

    _updateRightBat(rightShouldMiss) {
        if (this._ballInfo.vx > 0 && this._ballInfo.x > this._drawElements.canvas.width / 3) {
            let batVelocity = this._ballInfo.x / (this._drawElements.canvas.width / 3);

            this._rightBatY = this._getBatPosition(batVelocity, this._rightBatY, rightShouldMiss);
        }
    }

    _updateLeftBat(leftShouldMiss) {
        if (this._ballInfo.vx < 0 && this._ballInfo.x < this._drawElements.canvas.width - (this._drawElements.canvas.width / 3)) {
            let batVelocity = (this._drawElements.canvas.width - this._ballInfo.x) / (this._drawElements.canvas.width / 3);

            this._leftBatY = this._getBatPosition(batVelocity, this._leftBatY, leftShouldMiss);
        }
    }

    _getBatPosition(batVelocity, batY, shouldMiss) {
        if (shouldMiss) {
            batVelocity = 1;
        }

        if (batY > this._ballInfo.y) {
            batY -= batVelocity;

            if (batY < this._ballInfo.y - 25) {
                batY = this._ballInfo.y - 25;
            }
        } else if (batY < this._ballInfo.y) {
            batY += batVelocity;

            if (batY > this._ballInfo.y - 25) {
                batY = this._ballInfo.y - 25;
            }
        }

        if (batY < 10) {
            batY = 10;
        } else if (batY > this._drawElements.canvas.height - 60) {
            this._rightBatY = this._drawElements.canvas.height - 60;
        }

        return batY;
    }

    _checkIfPointWon() {
        if (this._ballInfo.x < -10 || this._ballInfo.x > this._drawElements.canvas.width) {
            this.resetBall();
            this.setScore();
        }
    }

    _drawScreen() {
        this._drawElements.clear();

        this._drawElements.drawNet();
        this._drawElements.drawScore(this.leftScore, this.rightScore);
        this._drawElements.drawLeftBat(this._leftBatY);
        this._drawElements.drawRightBat(this._rightBatY);
        this._drawElements.drawBall(this._ballInfo.x, this._ballInfo.y);
    }
}

let drawElements = new DrawElements(document.getElementById('pongclock'), 'white');
let pongClock = new PongClock(drawElements);

gameLoop(pongClock);

function gameLoop(pongClock) {
    window.setTimeout(function() { gameLoop(pongClock); }, 10);
    pongClock.update();
}