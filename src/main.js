const WIDTH = 820,
    HEIGHT = 800;

let userDrawing = true;
let userDrawnVertices = [];
let userPathlength;

let a;
let t;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    a = new Arm();

    background(255);
    fill(200);
    ellipse(WIDTH / 2, HEIGHT / 2, 800, 800);
    a.draw();
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

        
        
        a.draw();
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