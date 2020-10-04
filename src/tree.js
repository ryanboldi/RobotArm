class Tree{
    constructor(){
        this.functions = ['+','-','/','*'];
        this.semifunctions = ['min', 'max'];
        this.semiterminals = ['sin', 'cos', 'tan','atan','asin','acos', 'abs'];
        this.terminals = ['t', '1', '2', Math.PI.toString()];

        this.equation = this.getRandomEquation();
        console.log(this.equation);
    }

    getRandomEquation(){
        //pick two random functions, if trig function,
        return(`(${random(this.terminals)} ${random(this.functions)} ${random(this.terminals)})`)
    }

    feedForward(){
    }
}