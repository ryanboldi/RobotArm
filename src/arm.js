class Arm {
    constructor() {
        this.hinges = 2;
        this.armSegLength = 50;
        this.armSegWidth = 20;

        this.theta1 = 0;
        this.theta2 = 0;
    }

    draw() {

    }

    getDeltaTheta1(time) {
        return time;
    }

    getDeltaTheta2(time) {
        return time;
    }
}