class Arm {
    constructor() {
        this.hinges = 2;
        this.armSegLength = 200;
        this.armSegWidth = 20;

        this.maxSpeed = 0.1; //radians per second

        this.theta1 = 0;
        this.theta1Tree = new Tree();

        this.theta2 = 0;
        this.theta2Tree = new Tree();

        this.tipX = WIDTH / 2 + (400);
        this.tipY = HEIGHT / 2;

        this.timeCounter = 1;

        this.moving = true;
        this.fitness = 0;

        //stores the vertices that the arm is at every frame -> used to compute fitness.
        this.path = [];
    }

    draw(drawToScreen = true) {

        let platformX = WIDTH / 2;
        let platformY = 400;

        this.tipX = platformX + (this.armSegLength * (Math.cos(this.theta1) + Math.cos(this.theta2 + this.theta1)));
        this.tipY = platformY + (this.armSegLength * (Math.sin(this.theta1) + Math.sin(this.theta2 + this.theta1)));

        if (drawToScreen) {
            //noStroke();
            fill(0);
            rectMode(CENTER);
            //rect(platformX, platformY, 30, 20);

            push();
            translate(platformX, platformY);
            rotate(this.theta1);
            strokeWeight(this.armSegWidth);
            line(0, 0, this.armSegLength, 0);
            translate(this.armSegLength, 0);
            rotate(this.theta2);
            line(0, 0, this.armSegLength, 0);
            pop();

            //moves to the TIP of the second hand
            push();
            fill(255, 0, 0);

            translate(this.tipX, this.tipY);
            ellipse(0, 0, 10, 10);
            //ellipse(platformX + (this.armSegLength * (Math.cos(this.theta1) + Math.cos(this.theta2 + this.theta1))), platformY + (this.armSegLength * (Math.sin(this.theta1) + Math.sin(this.theta2 + this.theta1))), 10, 10);
            pop();
        }

        if (this.moving) {

            let theta1Dif = this.getTheta1() - this.theta1;
            if (theta1Dif > this.maxSpeed) {
                theta1Dif = this.maxSpeed;
            } else if (theta1Dif < (-this.maxSpeed)) {
                theta1Dif = -this.maxSpeed;
            }

            this.theta1 += theta1Dif;

            let theta2Dif = this.getTheta2() - this.theta2;
            if (theta2Dif > this.maxSpeed) {
                theta2Dif = this.maxSpeed;
            } else if (theta2Dif < (-this.maxSpeed)) {
                theta2Dif = -this.maxSpeed;
            }

            this.theta2 += theta2Dif;

            //ADD CURRENT TIP LOCATION TO ARM PATH
            this.path.push({ x: this.tipX, y: this.tipY });
            //console.log(`So far arm path length: ${getPathLength(this.path)}`);
            //console.log(`So far arm path length: ${this.path.length}`);  
        }

        if (drawToScreen) {
            push();
            beginShape(LINES);
            for (let i = 0; i < this.path.length; i++) {
                stroke(255, 0, 0);
                fill(255, 0, 0);
                strokeWeight(3);
                vertex(this.path[i].x, this.path[i].y);
            }
            endShape();
            pop();
        }

        //console.log(this.theta1);
        //console.log(this.theta2);
        if (this.moving) {
            if (this.path.length == userDrawnVertices.length) {
                //calculate fitness of this creature, 
                this.moving = false;
                this.fitness = getTotalPathDifference(userDrawnVertices, this.path);
                if (isNaN(this.fitness)) {
                    this.fitness = Infinity;
                }
                //console.log(this.fitness);
            }
        }
        this.timeCounter++;
    }

    getTheta1() {
        let e = 0;
        try {
            e = nerdamer(_.cloneDeep(this.theta1Tree.equation), { t: this.maxSpeed * this.timeCounter / 10 }, 'numer').evaluate();
        } catch (ParseError) {
            //dividing by 0
            e = 1000;
        }
        return 2 * e;
    }

    getTheta2() {
        let e = 0;
        try {
            e = nerdamer(_.cloneDeep(this.theta2Tree.equation), { t: this.maxSpeed * this.timeCounter / 10 }, 'numer').evaluate();
        } catch (ParseError) {
            //dividing by 0
            e = 1000;
        }
        return 2 * e;
    }

    mutate() {
        let clone = _.cloneDeep(this);

        if (random() < 0.5) {
            clone.theta1Tree.mutate();
        } else {
            clone.theta2Tree.mutate();
        }

        return clone;
    }

    computeFitness() {
        //take this.path, somehow compare it to the userdrawn vertices to get a closeness index.

    }
}