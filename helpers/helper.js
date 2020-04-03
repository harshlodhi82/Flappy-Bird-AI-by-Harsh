const keyPress = (event) => {
    for (let i = 0; i < birds.length; i++) {
        let bird = birds[i]
        if (event.key === " ") {
            bird.velocity = JUMP
        }
    }
}

const birdInit = () => {
    for (let i = 0; i < TOTAL_BIRDS; i++) {
        birds.push(new Bird())
        // lines.push(new Line())
    }
}


const clearPipes = () => {
    for (let i = 0; i < pipes.length; i++) {
        if (pipes[i].needToClear()) {
            pipes.splice(i, 1)
        }
    }
}

const loadImages = () => {
    birdImage.src = './static/bird.png'
    topPipeImage.src = './static/top_pipe.png'
    bottomPipeImage.src = './static/bottom_pipe.png'
    canvas.style.backgroundImage = `url("./static/bg.png")`
    canvas.style.backgroundRepeat = `no-repeat`
    canvas.style.backgroundPosition = `center`
    canvas.style.backgroundSize = `cover`
}

const gameOverChecker = () => {
    return bird.isIntersectWith(pipes[0]) || bird.isIntersectWith(pipes[1]) || bird.isIntersectWithBorder()
}

const clearBirds = () => {
    for (let i = 0; i < birds.length; i++) {
        let bird = birds[i]
        if (bird.isIntersectWith(pipes[0]) || bird.isIntersectWith(pipes[1]) || bird.isIntersectWithBorder()) {
            savedBirds.push(birds.splice(i, 1)[0])
        }
    }
}

const resetForGameOver = () => {
    pipes = []
    pipes.push(new Pipe(true))
    pipes.push(new Pipe(false, pipes[pipes.length - 1].height))
    counter = 0
    isGameOver = false
}

const dataInitializer = (data) => {
    fitnessElm.innerText = (data.fitness) ? Math.pow(data.fitness, 1 / powFitness) : '00'
    mutaionElm.innerText = (data.mutaion) ? `${data.mutaion * 100}%` : '00'
    generationElm.innerText = (data.generation) ? data.generation : '00'
    populationElm.innerText = (data.population) ? data.population : '00'
    scoresElm.innerText = (data.scores) ? data.scores : '00'
}