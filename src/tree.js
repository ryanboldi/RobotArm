class Tree{
    constructor(){
        this.nodes = [];
        this.nodes.push(new TreeNode(0, (a,b) => {return a + b}, NaN, NaN));
        this.nodes.push(new TreeNode(1, 3, 0, NaN));
        this.nodes.push(new TreeNode(2, 2, 0, NaN));
    }

    feedForward(t = 0){
        let e = nerdamer("(3+v)*(v*v)", {v=t}).evaluate();
        console.log(e);
    }
}