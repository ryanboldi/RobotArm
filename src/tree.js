class Tree{
    constructor(){
        this.functions = ['+','-','/','*'];
        this.semifunctions = ['min', 'max'];
        this.semiterminals = ['sin', 'cos', 'tan', 'log', 'e^'];
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
        } else if (term1Rand < 0.6){
            t1 = `${random(this.semiterminals)}(${random(this.terminals)})`
        } else if (term1Rand < 1) {
            t1 = this.getRandomEquation().toString();
        }

        if (term2Rand < 0.4){
            t2 = 't'
        } else if (term2Rand < 0.6){
            t2 = `${random(this.semiterminals)}(${random(this.terminals)})`
        } else if (term2Rand < 1) {
            t2 = this.getRandomEquation().toString();
        }

        func = `${t1} ${random(this.functions)} ${t2}`;
        return func
    }

    mutate(){
        //mutates the trees by changing the terminal nodes and subterminals etc
        console.log(this.equation);

        //10% chance we change a t into a new function
        if (random() < 1){
            if (this.equation.includes('t') == true){
                //find all ts and replace a random one with a new function
                let indexes = [...this.equation.matchAll(new RegExp('t', 'gi'))].map(a => a.index);
                console.log(indexes);
                let indexPixed = random(indexes);
                let arr = this.equation.split('');
                arr.splice(indexPixed, 1, this.getRandomEquation().toString());
                this.equation = arr.join('');
            }
        }
    }
}