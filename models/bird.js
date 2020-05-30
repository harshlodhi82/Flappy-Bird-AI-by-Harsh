class Bird {
    constructor() {
        this.x = 100
        this.y = WH / 2
        this.width = 100
        this.height = 60
        this.velocity = 0
        this.score = 0
        this.fitness = 0
        this.brain = new NeuralNetwork(5, 5, 1)
    }

    show(image) {
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

    update() {
        this.score++
        this.velocity += G
        this.y += this.velocity
    }

    think(topPipe, bottomPipe) {
        let inputs = [
            this.x,
            this.y,
            topPipe.y + topPipe.height,
            bottomPipe.y,
            topPipe.x - this.x
        ]

        let prediction = this.brain.predict(inputs)
        let output = prediction[0][0]

        if(output> 0.5){
            this.velocity = JUMP
        }  
    }

    isIntersectWithBorder() {
        return this.y < -1
            || this.y + this.height >= WH
    }

    isIntersectWith(pipe) {
        return this.x + this.width >= pipe.x + 10
            && this.x <= pipe.x + pipe.width - 20
            && this.y <= pipe.y + pipe.height - 10
            && this.y + this.height >= pipe.y + 10
    }

}