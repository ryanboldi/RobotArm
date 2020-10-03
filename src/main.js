const WIDTH = 800,
    HEIGHT = 800;

let a;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    a = new Arm();
}

function draw() {
    background(210);
    a.draw();
}