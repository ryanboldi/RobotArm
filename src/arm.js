class Arm {
    constructor() {
        this.hinges = 2;
        this.armSegLength = 160;
        this.armSegWidth = 20;

        this.theta1 = 0;
        this.theta2 = 0;

        this.timeCounter = 0;
    }

    draw() {
        let platformX = WIDTH / 2;
        let platformY = 600;

        let arm1Length = this.armSegLength;
        let arm1Width = this.armSegWidth;

        noStroke();
        fill(0);
        rectMode(CENTER);
        rect(platformX, platformY, 200, 20);

        push();
        //move to center
        translate(platformX, platformY);
        rotate(this.theta1 + (PI / 2));
        translate(-platformX, -platformY);
        rect(platformX, platformY - (arm1Length / 2), arm1Width, arm1Length);
        pop();

        push();
        translate(arm1Length * Math.cos(this.theta1), arm1Length * Math.sin(this.theta1));
        rotate(this.theta1 + (PI / 2));
        rect(0, 0, arm1Width, arm1Length);
        pop();

        this.theta1 = this.getTheta1();
        this.timeCounter++;
    }

    getTheta1() {
        return 0;
        //return this.timeCounter / 10;
    }

    getTheta2() {
        return this.timeCounter / 10;
    }
}