const nextGeneration = () => {
    calculateFitness()
    bestFitness = (savedBirds[savedBirds.length - 1]) ? savedBirds[savedBirds.length - 1].fitness : 0

    let { dad, mom } = chooseParents()
    for (let i = 0; i < TOTAL_BIRDS; i++) {
        let childBird = generateChild(dad, mom)
        birds.push(childBird)
    }
    savedBirds = []
}

const calculateFitness = () => {
    let sum = 0
    for (let i = 0; i < savedBirds.length; i++) {
        const bird = savedBirds[i];
        sum += bird.score
    }
    let mxI = 0
    let t = 0
    for (let i = 0; i < savedBirds.length; i++) {
        const bird = savedBirds[i];
        // bird.fitness = bird.score / sum
        bird.fitness = Math.pow(bird.score / sum, powFitness)
        t += bird.fitness
        if (maxFitness < bird.fitness) {
            maxFitness = bird.fitness
            mxI = i
        }
    }
    totalFitness = t
}

const chooseParents = () => {
    let dadIndex = getParentIndex()
    let momIndex = getParentIndex()
    return {
        dad: savedBirds[dadIndex],
        mom: savedBirds[momIndex],
    }
}

const generateChild = (dad, mom) => {
    let child = new Bird()
    child.brain.crossOver(dad.brain, mom.brain)
    child.brain.mutate(MUTATION)
    return child
}

const getParentIndex = () => {
    let i = 0
    let r2 = math.random(0, totalFitness)
    while (r2 > 0) {
        r2 -= savedBirds[i].fitness
        i++
    }
    i--
    return i
}