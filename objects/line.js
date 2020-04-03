class Line {
    constructor() {
        this.x = 0
        this.y = 0
        this.toX = 0
        this.toY = 0
    }

    show() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.toX, this.toY);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "red"
        ctx.stroke();
    }

    update(x, y, tx, ty){
        this.x = x
        this.y = y
        this.toX = tx
        this.toY = ty
    }
}