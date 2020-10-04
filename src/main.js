const WIDTH = 800,
    HEIGHT = 800;

let a;

let t;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    a = new Arm();
    frameRate(240);
    t = new Tree();
    t.feedForward();
}

function draw() {
    background(255);
    fill(200);
    ellipse(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT);
    a.draw();
}