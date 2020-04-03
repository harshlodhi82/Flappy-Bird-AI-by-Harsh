let birdImage = new Image()
let topPipeImage = new Image()
let bottomPipeImage = new Image()
// let lines = []
let birds = []
let savedBirds = []
let counter = 0
let pipes = []
let isGameOver = false
let aiData = {}
let generations = 0
let bestFitness = 0
let myScore = 0
let cycle = 1
let maxFitness = 0
let totalFitness = 0

const setup = () => {
    loadImages()
    birdInit()

    canvas.width = WH
    canvas.height = WH
    document.addEventListener('keydown', keyPress)
    pipes.push(new Pipe(true))
    pipes.push(new Pipe(false, pipes[pipes.length - 1].height))
    draw()
}

const draw = () => {
    let i = 0
    while (i < cycle) {
        ctx.clearRect(0, 0, WH, WH)
        clearBirds()
        clearPipes()
        aiData.generation = generations
        aiData.population = birds.length
        aiData.mutaion = MUTATION
        aiData.fitness = maxFitness
        aiData.scores = myScore
        dataInitializer(aiData)
        
        //show

        for (let i = 0; i < birds.length; i++) {
            birds[i].show(birdImage)
            // lines[i].show()
        }

        for (let i = 0; i < pipes.length; i++) {
            let img = (pipes[i].isTop) ? topPipeImage : bottomPipeImage
            pipes[i].show(img)
        }

        //update

        for (let i = 0; i < birds.length; i++) {
            birds[i].update()
            // lines[i].update(birds[i].x, birds[i].y, pipes[0].x, pipes[0].y + pipes[0].height)
            birds[i].think(pipes[0], pipes[1])
        }

        for (let i = 0; i < pipes.length; i++) {
            pipes[i].update()
        }

        myScore++
        counter++
        if (counter > pipeInterval) {
            counter = 0
            pipes.push(new Pipe(true))
            pipes.push(new Pipe(false, pipes[pipes.length - 1].height))
        }

        if (birds.length === 0) {
            cycle = 1
            generations++
            myScore = 0
            // birdInit()
            nextGeneration()
            resetForGameOver()
        }
        // if (!isGameOver) 
        window.requestAnimationFrame(draw)
        i++
    }

}

setup()

