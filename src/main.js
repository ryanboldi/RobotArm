const WIDTH = 820,
    HEIGHT = 800;

let userDrawing = true;
let userDrawnVertices = [];
let userPathlength;

let arms = [];

let t;

const ArmsPerGen = 8;
const survivors = ArmsPerGen/2;
let generation = 1;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    for (let i = 0; i< ArmsPerGen; i++){arms.push(new Arm());}

    background(255);
    fill(200);
    ellipse(WIDTH / 2, HEIGHT / 2, 800, 800);
    for (let i = 0; i< ArmsPerGen; i++){arms[i].draw();}
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

        
        
        for (let i = 0; i< ArmsPerGen; i++){arms[i].draw();}
        let allDone = true;
        for (let i = 0; i< ArmsPerGen; i++){
            if (arms[i].moving){
                allDone = false;
            }
        }

        if (allDone){
            NewGeneration();
            noLoop();
        }
    }
}

function NewGeneration(){
    //when all creatures are done, sort by fitness, pick new generation, clear board, and start again.
    let sortedArms = arms.sort((a, b) => (a.fitness > b.fitness) ? 1 : -1); //sort ascending
    let parentArms = _.cloneDeep(sortedArms).splice(0, survivors);

    let childrenArms = [];
    //half children made from crossover
    if (ArmsPerGen > 1){
        for (let i = 0; i < floor(ArmsPerGen/2); i++){
            let localParents = _.cloneDeep(parentArms);
            let parentIndex = floor(random(localParents.length));
            let parent1 = localParents.splice(parentIndex, 1);
            let parent2 = random(localParents);

            let t1 = childrenArms.push(parent1.theta1Tree.crossover(parent2.theta1Tree));
            let t2 = childrenArms.push(parent1.theta2Tree.crossover(parent2.theta2Tree));

            let child = _.cloneDeep(parent1);
            child.theta1Tree = t1;
            child.theta2Tree = t2;
            childrenArms.push(child);
        }
        for (let i = childrenArms.length; i < ArmsPerGen; i++){
            //make children via mutation
            childrenArms.push(_.cloneDeep(random(parentArms)).mutate());
        }
    }
    console.log(parentArms);
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
function getPathLength(path){
    if (path.length > 1){

        //starting values
        let x = path[0].x;
        let y = path[0].y;

        //second vertex
        let x1 = path[1].x;
        let y2 = path[1].y;
        let totalLength = 0;

        //for every vertex
        for (let i = 1; i< path.length; i++){
            x1 = path[i].x;
            y1 = path[i].y;

            let segmentLength = Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2));
            totalLength += segmentLength;

            x = x1;
            y = y1;
        }
        return totalLength;
    }   
    return 0;
}

//returns the difference between two paths' vertices.
function getTotalPathDifference(path1, path2){
    let difference = 0;

    //ASSUME path1.length >= path2.length
    if (path2.length >= path1.length){
        for(let i = 0; i < path1.length; i++){
            difference += (Math.sqrt(Math.pow(path1[i].x - path2[i].x, 2) + Math.pow(path1[i].y - path2[i].y, 2)));
        }
    }else{
        console.log("Path lengths don't match up, try again");
        difference = 10000; // BAD
    }

    return difference;
}