const WIDTH = 800,
    HEIGHT = 800;

let a;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    a = new Arm();
}

function draw() {
    background(210);
    fill(200);
    ellipse(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT);
    a.draw();
}