class NeuralNetwork{

    constructor(inputs, hiddenNodes, outputs){
        this.input_nodes = inputs
        this.hidden_nodes = hiddenNodes
        this.output_nodes = outputs
        this.weights_ih = math.zeros(this.hidden_nodes, this.input_nodes)
        this.weights_ho = math.zeros(this.output_nodes, this.hidden_nodes)
        this.bias_h = math.zeros(this.hidden_nodes, 1)
        this.bias_o = math.zeros(this.output_nodes, 1)

        this.weights_ih = this.randomize(this.weights_ih)
        this.weights_ho = this.randomize(this.weights_ho)
        this.bias_h = this.randomize(this.bias_h)
        this.bias_o = this.randomize(this.bias_o)
    }

    predict(inputs){
        inputs = inputs.map(v => [v])
        inputs = math.matrix(inputs)
        // WI+B
        let hidden_values = math.multiply(this.weights_ih, inputs)
        hidden_values = math.add(hidden_values, this.bias_h)

        let sigmoid_hidden = this.sigmoidThis(hidden_values)

        //WH + B
        let output_values = math.multiply(this.weights_ho, sigmoid_hidden)
        output_values = math.add(output_values, this.bias_o)

        let sigmoid_output = this.sigmoidThis(output_values)

        return sigmoid_output._data
    }

    crossOver(dad_brain, mom_brain) {

        this.weights_ih = this.crossOver_helper(this.weights_ih, dad_brain.weights_ih, mom_brain.weights_ih)
        this.weights_ho = this.crossOver_helper(this.weights_ho, dad_brain.weights_ho, mom_brain.weights_ho)

        this.bias_h = this.crossOver_helper(this.bias_h, dad_brain.bias_h, mom_brain.bias_h)
        this.bias_o = this.crossOver_helper(this.bias_o, dad_brain.bias_o, mom_brain.bias_o)
    }

    crossOver_helper(my_matrix, dad_matrix, mom_brain) {
        let my_matrix_size = math.size(my_matrix)
        let size = my_matrix_size._data[0] * my_matrix_size._data[1]
        let crossOverPoint = Math.floor(size / 2)
        let i = 0
        my_matrix = my_matrix.map((v, index) => {
            let _row = index[0]
            let _col = index[1]
            if (i <= crossOverPoint) {
                i++
                return dad_matrix._data[_row][_col]
            } else {
                i++
                return mom_brain._data[_row][_col]
            }

        })
        return my_matrix
    }

    mutate(mutate_value) {
        this.weights_ih = this.mutate_helper(this.weights_ih, mutate_value)
        this.weights_ho = this.mutate_helper(this.weights_ho, mutate_value)
        this.bias_h = this.mutate_helper(this.bias_h, mutate_value)
        this.bias_o = this.mutate_helper(this.bias_o, mutate_value)
    }

    mutate_helper(myMatrix, mutation_value) {
        myMatrix = myMatrix.map((v) => {
            let n = math.random(0, 1)
            if (n < mutation_value) {
                return math.random(-1, 1)
            } else {
                return v
            }
        })
        return myMatrix
    }

    randomize(matrix){
        matrix = matrix.map((v)=>{
            return math.random(-1, 1)
        })
        return  matrix
    }

    sigmoid(t) {
        return 1 / (1 + Math.pow(Math.E, -t));
    }

    sigmoidThis(matrix) {
        matrix = matrix.map((v) => {
            return this.sigmoid(v)
        })
        return matrix
    }

    stringfy() {
        return JSON.stringify(this)
    }

    parse(strJSON) {
        let data = JSON.parse(strJSON)
        Object.assign(this.weights_ih, math.matrix(data.weights_ih.data))
        Object.assign(this.weights_ho, math.matrix(data.weights_ho.data))
        Object.assign(this.bias_h, math.matrix(data.bias_h.data))
        Object.assign(this.bias_o, math.matrix(data.bias_o.data))
    }

}