class Tree {
    constructor() {
        this.functions = ['+', '-', '/', '*'];
        // this.semifunctions = ['min', 'max'];
        this.semiterminals = ['sin', 'cos', 'tan', 'log'];
        this.terminals = ['t', '0.1'];

        this.equation = this.getRandomEquation();
        //console.log(this.equation);

        //MUST ADD TO 1 vvv
        this.depthMutRate = 0.1;
        this.semiTermMutRate = 0.4;
        this.funcMutRate = 0.41;
        this.simplifyMutRate = 0.09;
        //console.log(nerdamer(this.equation).text());
    }

    getRandomEquation() {
        //pick two random functions, if trig function,
        let ran = random();
        let func = NaN;

        //pick two terminals, either terminals, number, or another function
        let term1Rand = random();
        let term2Rand = random();
        let t1;
        let t2;


        if (term1Rand < 0.4) {
            t1 = 't'
        } else if (term1Rand < 0.6) {
            t1 = `${random(this.semiterminals)}(${random(this.terminals)})`
        } else if (term1Rand < 1) {
            t1 = `${this.getRandomEquation().toString()}`;
        }

        if (term2Rand < 0.4) {
            t2 = 't'
        } else if (term2Rand < 0.6) {
            t2 = `${random(this.semiterminals)}(${random(this.terminals)})`
        } else if (term2Rand < 1) {
            t2 = `${this.getRandomEquation().toString()}`;
        }

        func = `(${t1} ${random(this.functions)} ${t2})`;
        return func
    }

    mutate() {
        //mutates the trees by changing the terminal nodes and subterminals etc
        //console.log(this.equation);

        let mutationRan = random();
        if (mutationRan < this.depthMutRate) {
            //chance we change a t into a new function
            if (this.equation.includes('t') == true) {
                //find all ts and replace a random one with a new function
                let indexes = [...this.equation.matchAll(new RegExp('t', 'gi'))].map(a => a.index);
                //console.log(indexes);
                let indexPixed = random(indexes);
                let arr = this.equation.split('');
                arr.splice(indexPixed, 1, this.getRandomEquation().toString());
                this.equation = arr.join('');
                console.log(`added more depth mutation -> ${this.equation}`);
                return _.cloneDeep(this);
            }
        } else if (mutationRan < this.semiTermMutRate) {
            //10% chance we replace one function with another
            let semiTerminalsFound = [];
            for (let i = 0; i < this.semiterminals.length; i++) {
                if (this.equation.includes(this.semiterminals[i])) {
                    semiTerminalsFound.push(this.semiterminals[i]);
                }
            }
            if (semiTerminalsFound.length > 0) {
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
                return _.cloneDeep(this);
            }

        } else if (mutationRan < this.funcMutRate) {
            //chance we change a random function (+ -> -);
            let functionsFound = [];
            for (let i = 0; i < this.functions.length; i++) {
                if (this.equation.includes(this.functions[i])) {
                    functionsFound.push(this.functions[i]);
                }
            }

            if (functionsFound.length > 0) {
                let functionPicked = random(functionsFound);


                let arr = this.equation.split('');
                //get all indexes this function occurs on
                let indexes = findAllOccurances(arr, functionPicked);

                let indexPicked = random(indexes);

                //console.log(arr);
                //console.log(indexPicked);
                arr.splice(indexPicked, functionPicked.length, random(this.functions));
                this.equation = arr.join('');
                //console.log(`Mutated random function -> ${this.equation}`);
                return _.cloneDeep(this);
            }
        } else if (mutationRan < this.simplifyMutRate) {
            if (this.equation.includes('(')) {
                //replace a random bracketed segment with 't'
                let randomStartEnd = randomBracketedExpression(this.equation);
                let arr = this.equation.split('');

                arr.splice(randomStartEnd.start, (randomStartEnd.end - randomStartEnd.start + 1), `(${random(this.terminals)})`);

                this.equation = arr.join('');
                //console.log(`Mutated Simplified -> ${this.equation} `);
                return _.cloneDeep(this);
            }
        }
        return _.cloneDeep(this);
    }


    crossover(other) {
        if (other instanceof Tree) {
            //THIS WILL BE RECEIVER, OTHER WILL BE DONOR
            let thisStartEnd = randomBracketedExpression(this.equation);
            let otherStartEnd = randomBracketedExpression(other.equation);

            //console.log(thisStartEnd);
            // console.log(otherStartEnd);

            let thisClone = _.cloneDeep(this);
            let otherClone = _.cloneDeep(other);
            let childArr = thisClone.equation.split('');

            let donation = otherClone.equation.slice(otherStartEnd.start, otherStartEnd.end + 1);
            //console.log(donation);

            childArr.splice(thisStartEnd.start, (thisStartEnd.end - thisStartEnd.start + 1), donation);
            //console.log(childArr);

            let child = _.cloneDeep(this);
            child.equation = childArr.join('');

            //console.log(child.equation);

            return _.cloneDeep(child);
        }
    }
}


//finds all occurances of searchTerm in arr, returns index array, starting at startIndex
function findAllOccurances(arr, searchTerm, startIndex = 0) {
    let indexArray = [];
    for (let i = startIndex; i < arr.length; i++) {
        if (arr[i] == searchTerm) {
            indexArray.push(i)
        }
    }

    return indexArray;
}


//returns object containing array indexs of all brackets, and array of types of brackets
function findAllBrackets(arr) {
    let indexArray = [];
    let bracketType = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "(" || arr[i] == ')') {
            indexArray.push(i);
            bracketType.push(arr[i]);
        }
    }

    return {
        indexArray: indexArray,
        bracketType: bracketType
    };
}

//returns start and end indexes
function randomBracketedExpression(equation) {
    //pick crossover point, and swap everything within that function.
    //eg sin(f(x)) X cos(g(x)) => sin(g(x))
    //find all open brackets, pick one at random
    if (equation.includes('(')) {

        let thisBracks = findAllBrackets(equation.split(''));
        let thisBrackIndexes = thisBracks.indexArray;
        let thisBrackTypes = thisBracks.bracketType;

        //console.log(thisBrackIndexes);

        let thisRightBracksIndex = [];
        for (let i = 0; i < thisBrackIndexes.length; i++) {
            if (thisBrackTypes[i] == '(') {
                thisRightBracksIndex.push(thisBrackIndexes[i]);
            }
        }

        let thisPickedLeft = random(thisRightBracksIndex); //pick a random left bracket starting point
        let thisPickedRight; //corresponding right bracket

        let thisEquationArr = _.cloneDeep(equation).split('');
        let thisBracketTotal = 0;
        for (let i = thisPickedLeft; i < thisEquationArr.length; i++) {
            if (thisEquationArr[i] == ')') {
                thisBracketTotal -= 1;
            } else if (thisEquationArr[i] == '(') {
                thisBracketTotal += 1;
            }
            if (thisBracketTotal == 0) {
                thisPickedRight = i;
                break;
            }
        }

        //test
        //console.log(equation.split('').splice(thisPickedLeft, (thisPickedRight - thisPickedLeft + 1)));

        return {
            start: thisPickedLeft,
            end: thisPickedRight
        };
    }
    return {
        start: 0,
        end: 0
    };
}