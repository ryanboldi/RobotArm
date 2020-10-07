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

        this.timeCounter = 1;
    }

    draw() {
        let platformX = WIDTH / 2;
        let platformY = 400;

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
        translate(platformX + (this.armSegLength * (Math.cos(this.theta1) + Math.cos(this.theta2 + this.theta1))), platformY + (this.armSegLength * (Math.sin(this.theta1) + Math.sin(this.theta2 + this.theta1))));
        ellipse(0,0,10,10);
        //ellipse(platformX + (this.armSegLength * (Math.cos(this.theta1) + Math.cos(this.theta2 + this.theta1))), platformY + (this.armSegLength * (Math.sin(this.theta1) + Math.sin(this.theta2 + this.theta1))), 10, 10);
        pop();

        let theta1Dif = this.getTheta1() - this.theta1;
        if (theta1Dif > this.maxSpeed){
            theta1Dif = this.maxSpeed;
        } else if (theta1Dif < (-this.maxSpeed)){
            theta1Dif = -this.maxSpeed;
        }

        this.theta1 += theta1Dif;
     
        let theta2Dif = this.getTheta2() - this.theta2;
        if (theta2Dif > this.maxSpeed){
            theta2Dif = this.maxSpeed;
        } else if (theta2Dif < (-this.maxSpeed)){
            theta2Dif = -this.maxSpeed;
        }
        
        this.theta2 += theta2Dif;

        //console.log(this.theta1);
        //console.log(this.theta2);
        this.timeCounter++;
    }

    getTheta1() {
        //return this.timeCounter/100;
        let e = nerdamer(this.theta1Tree.equation, {t:this.timeCounter/100}, 'numer').evaluate();
        //console.log(e.text());
        return (e);
        //return (this.timeCounter / 20); 
    }

    getTheta2() {
        //return -this.timeCounter/100 ;
        let e = nerdamer(this.theta2Tree.equation, {t:this.timeCounter/100}, 'numer').evaluate();
        //console.log(e.text());
        return (e);
        //return (this.timeCounter / 10);

    }

    mutate(){
        this.theta1Tree.mutate();
        this.theta2Tree.mutate();
    
    }
}