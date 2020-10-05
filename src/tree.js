class Tree{
    constructor(){
        this.functions = ['+','-','/','*'];
        this.semifunctions = ['min', 'max'];
        this.semiterminals = ['sin', 'cos', 'tan', 'cosh', 'sinh', 'tanh'];
        this.terminals = ['t', this.getRandomEquation().toString()];

        this.equation = this.getRandomEquation();
        console.log(nerdamer(this.equation).text());
    }

    getRandomEquation(){
        //pick two random functions, if trig function,
        let ran = random();
        if (ran < 0.3){
            return(`(${random(this.terminals)} ${random(this.functions)} ${random(this.terminals)})`);
        } else if (ran < 0.5){
            return(`${random(this.semifunctions)}(${random(this.terminals)}, ${random(this.terminals)})`);
        } else if (ran < 1){
            return(`${random(this.semiterminals)}(${random(this.terminals)})`)
        } else{
            return(`${random(this.terminals)}`);
        }
    }
}