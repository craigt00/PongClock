export class DrawElements {
    constructor(canvas, colour) {
        canvas.width = 512;
        canvas.height = 256;

        this.canvas = canvas;
        this._context = canvas.getContext('2d');
        this._colour = colour;
        this._context.font = '30px Lucida Console';
    }

    drawLeftBat(y) {
        this._drawBat(10, y, this._colour);
    }

    drawRightBat(y) {
        this._drawBat(this.canvas.width - 20, y, this._colour);
    }

    drawNet() {
        this._context.beginPath();
        this._context.strokeStyle = this._colour;
        this._context.lineWidth = 10;
        this._context.setLineDash([this.canvas.height / 15, this.canvas.height / 15]);
        this._context.moveTo(this.canvas.width / 2, 0);
        this._context.lineTo(this.canvas.width / 2, this.canvas.height);
        this._context.stroke();
    }

    drawScore(leftScore, rightScore) {
        this._context.fillStyle = this._colour;
        this._context.fillText(leftScore.toString().padStart(2, '0'), this.canvas.width / 2 - 50, 30);
        this._context.fillText(rightScore.toString().padStart(2, '0'), this.canvas.width / 2 + 12, 30);
    }

    drawBall(x, y) {
        this._context.fillStyle = this._colour;
        this._context.fillRect(x, y, 10, 10);
    }

    clear() {
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _drawBat(x, y) {
        this._context.fillStyle = this._colour;
        this._context.fillRect(x, y, 10, 50);
    }
}