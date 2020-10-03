class Arm {
    constructor() {
        this.hinges = 2;
        this.armSegLength = 50;
        this.armSegWidth = 20;

        this.theta1 = PI / 3;
        this.theta2 = 0;

        this.timeCounter = 0;
    }

    draw() {
        noStroke();
        fill(0);
        rectMode(CENTER);
        rect(WIDTH / 2, HEIGHT / 1.2, 200, 20);

        push();
        //move to center
        translate(WIDTH / 2, HEIGHT / 1.2);
        rotate(this.theta1);
        translate(-WIDTH / 2, -HEIGHT / 1.2);
        rect(WIDTH / 2, HEIGHT / 1.2 - 80, 20, 160);
        pop();

        this.theta1 = this.theta1 + this.getTheta1();
    }

    getTheta1() {
        return this.timeCounter / 10;
    }

    getTheta2() {
        return this.timeCounter / 10;
    }
}