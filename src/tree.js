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

    getRandomEquation(){
        //pick two random functions, if trig function,
        let ran = random();
        let func = NaN;

        //pick two terminals, either terminals, number, or another function
        let term1Rand = random();
        let term2Rand = random();
        let t1;
        let t2;

        if (term1Rand < 0.4){
            t1 = 't'
        } else if (term1Rand < 0.8){
            t1 = `${random(this.semiterminals)}(${random(this.terminals)})`
        } else if (term1Rand < 1) {
            t1 = this.getRandomEquation().toString();
        }

        if (term2Rand < 0.4){
            t2 = 't'
        } else if (term2Rand < 0.8){
            t2 = `${random(this.semiterminals)}(${random(this.terminals)})`
        } else if (term2Rand < 1) {
            t2 = this.getRandomEquation().toString();
        }

        func = `${t1} ${random(this.functions)} ${t2}`;
        // if (ran < 0.1){
        //     func = (`(${random(this.terminals)} ${random(this.functions)} ${random(this.terminals)})`);
        // } else if (ran < 0.2){
        //     func = (`${random(this.semifunctions)}(${random(this.terminals)}, ${random(this.terminals)})`);
        // } else if (ran < 0.3){
        //     func = (`${random(this.semiterminals)}(${random(this.terminals)})`)
        // } else{
        //     func = (`(${random(this.terminals)} ${random(this.functions)} ${this.getRandomEquation().toString()})`);
        // }


        return func
    }
}