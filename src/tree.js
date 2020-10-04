class Tree{
    constructor(){
        this.functions = ['+','-','/','*'];
        this.semifunctions = ['min', 'max'];
        this.semiterminals = ['sin', 'cos', 'tan','atan','asin','acos', 'abs'];
        this.terminals = ['t', this.getRandomEquation()];

        this.equation = this.getRandomEquation();
        console.log(this.equation);
    }

    getRandomEquation(){
        //pick two random functions, if trig function,
        let ran = random();
        if (ran < 0.3){
            return(`(${random(this.terminals)} ${random(this.functions)} ${random(this.terminals)})`);
        } else if (ran < 0.3){
            return(`${random(this.semifunctions)}(${random(this.terminals)}, ${random(this.terminals)})`);
        } else if (ran < 0.95){
            return(`${random(this.semiterminals)}(${random(this.terminals)})`)
        } else{
            return(`${random(this.terminals)}`);
        }
    }
}