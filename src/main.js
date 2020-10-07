const WIDTH = 810,
    HEIGHT = 800;

let a;
let t;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    a = new Arm();
    //t = new Tree();

    //let e = nerdamer('(3+v)*(v*v)');
    //console.log(e.text());
}

function draw() {
    background(255);
    fill(200);
    ellipse(WIDTH / 2, HEIGHT / 2, 800, 800);
    a.draw();
}

function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}