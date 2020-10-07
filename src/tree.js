class Tree{
    constructor(){
        this.functions = ['+','-','/','*'];
       // this.semifunctions = ['min', 'max'];
        this.semiterminals = ['sin', 'cos', 'tan', 'log'];
        this.terminals = ['t', '0.1'];

        this.equation = this.getRandomEquation();
        console.log(this.equation);

        this.depthMutRate = 0.1;
        this.semiTermMutRate = 0.2;
        this.funcMutRate = 0.5;
        //console.log(nerdamer(this.equation).text());
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
        //console.log(this.equation);

        let mutationRan = random();
        //10% chance we change a t into a new function
        if (mutationRan < this.depthMutRate){
            if (this.equation.includes('t') == true){
                //find all ts and replace a random one with a new function
                let indexes = [...this.equation.matchAll(new RegExp('t', 'gi'))].map(a => a.index);
                //console.log(indexes);
                let indexPixed = random(indexes);
                let arr = this.equation.split('');
                arr.splice(indexPixed, 1, this.getRandomEquation().toString());
                this.equation = arr.join('');
                console.log(`added more depth mutation -> ${this.equation}`);
            }
            //10% chance we replace one function with another
        } else if (mutationRan < this.semiTermMutRate){
            let semiTerminalsFound = [];
            for(let i = 0; i < this.semiterminals.length; i++){
                if (this.equation.includes(this.semiterminals[i])){
                    semiTerminalsFound.push(this.semiterminals[i]);
                }
            }
            if (semiTerminalsFound.length > 0){
            //console.log(semiTerminalsFound);
            let semiTerminalPicked = random(semiTerminalsFound);
            //console.log(semiTerminalPicked);

            //all occurances of this function
            let indexes = [...this.equation.matchAll(new RegExp(semiTerminalPicked.toString(), 'gi'))].map(a => a.index);
            //console.log(indexes);
            let indexPicked = random(indexes); //index of first letter of function picked

            //console.log(indexPicked);
            let arr = this.equation.split('');
            arr.splice(indexPicked, semiTerminalPicked.length, random(this.semiterminals));
            this.equation = arr.join('');
            console.log(`Mutated random SemiTerminal -> ${this.equation}`);
            }
            //10% chance we change a random function (+ -> -);
        } else if (mutationRan < this.funcMutRate){
            let functionsFound = [];
            for(let i = 0; i < this.functions.length; i++){
                if (this.equation.includes(this.functions[i])){
                    functionsFound.push(this.functions[i]);
                }
            }

            if (functionsFound.length > 0){
                let functionPicked = random(functionsFound);
                

                let arr = this.equation.split('');
                //get all indexes this function occurs on
                let indexes = findAllOccurances(arr, functionPicked);

                let indexPicked = random(indexes);

                console.log(arr);
                console.log(indexPicked);
                arr.splice(indexPicked, functionPicked.length, random(this.functions));
                this.equation = arr.join('');
                console.log(`Mutated random function -> ${this.equation}`);
            }
        }
    }
}

//finds all occurances of searchTerm in arr, returns index array
function findAllOccurances(arr, searchTerm){
    let indexArray = [];
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == searchTerm){
            indexArray.push(i)
        }
    }

    return indexArray;
}