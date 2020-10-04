const WIDTH = 800,
    HEIGHT = 800;

let a;
let t;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    a = new Arm();
    
    let e = nerdamer("(3+v)*(v*v)", {v:4}).evaluate();
    console.log(e);
}

function draw() {
    background(255);
    fill(200);
    ellipse(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT);
    a.draw();
}