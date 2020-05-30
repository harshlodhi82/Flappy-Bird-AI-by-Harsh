class Pipe{

    constructor(isTop, topHight){
        // this.height = 300
        this.height = (isTop) ? math.randomInt( minHightPipe, WH- minHightPipe - gap) : WH - topHight - gap
        this.width = 50
        this.x = WH -this.width
        this.y = (isTop) ? 0 : WH - this.height
        this.isTop = isTop
    }

    show(image){ 
        // ctx.fillStyle = "black";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
        // if(this.isTop) ctx.rotate(Math.PI/2);
    }

    update(){
        this.x -= pipeSpeed
    }

    updateColor(){
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.fill()
    }

    needToClear(){
        return this.x + this.width < 0
    }
}