const WIDTH = 820,
    HEIGHT = 800;

let userDrawing = true;
let userDrawnVertices = [];
let userPathlength;

let arms = [];

let t;

const ArmsPerGen = 16;
const crossoverProportion = 3; // 1/this = amount of crossover
const survivors = ArmsPerGen / 2;
let generation = 1;

let currentShowing;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    for (let i = 0; i < ArmsPerGen; i++) { arms.push(new Arm()); }

    background(255);
    fill(200);
    ellipse(WIDTH / 2, HEIGHT / 2, 800, 800);
    for (let i = 0; i < ArmsPerGen; i++) { arms[i].draw(); }
}

function draw() {
    //USER DRAWING MODE
    if (userDrawing && mouseIsPressed) {
        push();
        stroke(0);
        fill(0)
        strokeWeight(3);
        beginShape(POINTS);
        vertex(mouseX, mouseY);
        userDrawnVertices.push({ x: mouseX, y: mouseY });
        endShape();
        pop();
    }


    if (!userDrawing) {
        background(255);
        fill(200);
        ellipse(WIDTH / 2, HEIGHT / 2, 800, 800);

        //DRAW THE POINTS THAT WE SAVED
        push();
        beginShape(LINES);
        for (let i = 0; i < userDrawnVertices.length; i++) {
            stroke(0);
            fill(0)
            strokeWeight(3);
            vertex(userDrawnVertices[i].x, userDrawnVertices[i].y);
        }
        endShape();
        pop();


        if (currentShowing == undefined) {
            console.log("Wait for first generation to finish before viewing bests");
        } else {
            currentShowing.draw(true);
            textSize(15);
            text(currentShowing.theta1Tree.equation, 200, 600);
            text(currentShowing.theta2Tree.equation, 200, 650);
        }

        for (let i = 0; i < ArmsPerGen; i++) { arms[i].draw(false); }
        let allDone = true;
        for (let i = 0; i < ArmsPerGen; i++) {
            if (arms[i].moving) {
                allDone = false;
            }
        }

        if (allDone) {
            NewGeneration();
            //noLoop();
        }
    }
}

function NewGeneration() {
    //when all creatures are done, sort by fitness, pick new generation, clear board, and start again.
    let sortedArms = arms.sort((a, b) => (a.fitness > b.fitness) ? 1 : -1); //sort ascending
    let parentArms = _.cloneDeep(sortedArms).splice(0, survivors);

    currentShowing = _.cloneDeep(sortedArms[0]); // best of the generation
    currentShowing.theta1 = 0;
    currentShowing.theta2 = 0;
    currentShowing.timeCounter = 1;
    currentShowing.moving = true;
    currentShowing.fitness = 0;
    currentShowing.path = [];

    let childrenArms = [];
    //half children made from crossover
    if (ArmsPerGen > 1) {
        for (let i = 0; i < floor(ArmsPerGen / 3); i++) {
            let localParents = _.cloneDeep(parentArms);
            let parentIndex = floor(random(localParents.length));
            let parent1 = localParents.splice(parentIndex, 1)[0];
            let parent2 = random(localParents);

            let t1 = parent1.theta1Tree.crossover(parent2.theta1Tree);
            let t2 = parent1.theta2Tree.crossover(parent2.theta2Tree);

            let child = _.cloneDeep(parent1);
            child.theta1Tree = t1;
            child.theta2Tree = t2;
            childrenArms.push(child);
        }

        //add best creature to childrenArms
        childrenArms.push(_.cloneDeep(sortedArms[0]));

        for (let i = childrenArms.length; i < ArmsPerGen; i++) {
            //make children via mutation
            let randomClone = _.cloneDeep(random(parentArms));
            //console.log(randomClone);
            childrenArms.push(randomClone.mutate());
        }
    }
    console.log(childrenArms);
    generation++;

    arms = null;

    arms = childrenArms;
    for (let i = 0; i < arms.length; i++) {
        arms[i].theta1 = 0;
        arms[i].theta2 = 0;
        arms[i].timeCounter = 1;
        arms[i].moving = true;
        arms[i].fitness = 0;
        arms[i].path = [];
    }
}

function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}

function mouseReleased() {
    userDrawing = false;
    userPathLength = userDrawnVertices.length;
    //userPathlength = ceil(getPathLength(userDrawnVertices));
    console.log(userPathLength);
}


//goes from each vertex to the next, totalling the distance of the whole path
function getPathLength(path) {
    if (path.length > 1) {

        //starting values
        let x = path[0].x;
        let y = path[0].y;

        //second vertex
        let x1 = path[1].x;
        let y2 = path[1].y;
        let totalLength = 0;

        //for every vertex
        for (let i = 1; i < path.length; i++) {
            x1 = path[i].x;
            y1 = path[i].y;

            let segmentLength = Math.sqrt(Math.pow((x - x1), 2) + Math.pow((y - y1), 2));
            totalLength += segmentLength;

            x = x1;
            y = y1;
        }
        return totalLength;
    }
    return 0;
}

//returns the difference between two paths' vertices.
function getTotalPathDifference(path1, path2) {
    let difference = 0;

    //ASSUME path1.length >= path2.length
    if (path2.length >= path1.length) {
        for (let i = 0; i < path1.length; i++) {
            difference += (Math.sqrt(Math.pow(path1[i].x - path2[i].x, 2) + Math.pow(path1[i].y - path2[i].y, 2)));
        }
    } else {
        console.log("Path lengths don't match up, try again");
        difference = 10000; // BAD
    }

    return difference;
}


function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
};

//https://gist.github.com/argelius
function DiscreteFrechet(path1, path2) {
    //need to convert object to rectangular array
    let a = [],
        b = [];

    for (let i = 0; i < path1.length; i++) {
        let newArr = []
        newArr.push(path1[i].x);
        newArr.push(path1[i].y);
        a.push(newArr);

        newArr = []
        newArr.push(path2[i].x);
        newArr.push(path2[i].y);
        b.push(newArr);
    }

    let C = new Float32Array(a.length * b.length),
        dim = a.length,
        i, j;

    C[0] = distance(a[0], b[0]);

    //console.log(C);

    for (j = 1; j < dim; j++) {
        C[j] = Math.max(C[j - 1], distance(a[0], b[j]));
    }

    for (i = 1; i < dim; i++) {
        C[i * dim] = Math.max(C[(i - 1) * dim], distance(a[i], b[0]));
    }

    for (i = 1; i < dim; i++) {
        for (j = 1; j < dim; j++) {
            C[i * dim + j] = Math.max(
                Math.min(C[(i - 1) * dim + j], C[(i - 1) * dim + j - 1], C[i * dim + j - 1]),
                distance(a[i], b[j])
            );
        }
    }

    return C[C.length - 1];
}

//finds all numbers in a given string including multi digit numbers,
//returns array of indexes along with the length of the numbers
function findAllNumbers(str){
    let numbers = []
    for (let i = 0; i< str.length;i++){
        if (!isNaN(parsefloat(str[i]))){

        }
    }
}