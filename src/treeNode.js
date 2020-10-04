class TreeNode{
    constructor(id, type, parent = NaN, children = NaN){
        this.id = id;
        this.name = type;
        this.children = children;
        this.parent = parent;
    }
}