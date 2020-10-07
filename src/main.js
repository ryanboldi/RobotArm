const WIDTH = 820,
    HEIGHT = 800;

let userDrawing = true;

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

    if (!userDrawing) {
        background(255);
        fill(200);
        ellipse(WIDTH / 2, HEIGHT / 2, 800, 800);
        a.draw();
    }
}

function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}