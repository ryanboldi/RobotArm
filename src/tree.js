class Tree{
    constructor(){
        this.nodes = [];
        this.nodes.push(new TreeNode(0, (a,b) => {return a + b}, NaN, NaN));
        this.nodes.push(new TreeNode(1, 3, 0, NaN));
        this.nodes.push(new TreeNode(2, 2, 0, NaN));
    }

    feedForward(v = 0){
        console.log(Math.evaluate("(5 * 5) + (3 + 4)"));
    }
}