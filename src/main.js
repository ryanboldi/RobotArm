const WIDTH = 820,
    HEIGHT = 800;

let userDrawing = true;
let userDrawnVertices = [];

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
        push();
        for (let i = 0; i < userDrawnVertices.length; i++) {
            stroke(0);
            fill(0)
            strokeWeight(3);
            beginShape(POINTS);
            userDrawnVertices.push({ x: mouseX, y: mouseY });
            endShape();
        }
        pop();



        background(255);
        fill(200);
        ellipse(WIDTH / 2, HEIGHT / 2, 800, 800);
        a.draw();
    }
}

function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}

function mouseReleased() {
    userDrawing = false;
}