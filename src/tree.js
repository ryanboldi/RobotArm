class Tree{
    constructor(){
        this.functions = ['+','-','/','*'];
        this.semifunctions = ['min', 'max'];
        this.semiterminals = ['sin', 'cos', 'tan'];
        this.terminals = ['t', '0.1'];

        this.equation = this.getRandomEquation();
        console.log(this.equation);
        console.log(nerdamer(this.equation).text());
    }

    getRandomEquation(t){
        //pick two random functions, if trig function,
        let ran = random();
        let func = NaN;
        if (ran < 0.1){
            func = (`(${random(this.terminals)} ${random(this.functions)} ${random(this.terminals)})`);
        } else if (ran < 0.2){
            func = (`${random(this.semifunctions)}(${random(this.terminals)}, ${random(this.terminals)})`);
        } else if (ran < 0.3){
            func = (`${random(this.semiterminals)}(${random(this.terminals)})`)
        } else{
            func = (`(${random(this.terminals)} ${random(this.functions)} ${this.getRandomEquation().toString()})`);
        }

        console.log(func);
        return func
        
    }
}