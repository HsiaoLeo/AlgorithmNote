//https://www.guru99.com/avl-tree.html#4
//之後改成策略模式那樣，可以決定BST為AVL或一般
class NumberData{
    value
    constructor(v){
        this.value = v;
    }
    cmp(dataNode){
        if(this.value > dataNode.value) return 1;
        else if(this.value < dataNode.value) return -1;
        else return 0;
    }
    show(){
        console.log(this.value);
        return this.value;
    }
}
class BSTnodes{
    data=null
    left=null
    right=null
    constructor(data){
        this.data=data;
    }
}
class AVLnodes extends BSTnodes{
    constructor(data){
        super(data);
    }
}
class AVL{
    root=null
    nodetype = AVLnodes
    datatype = NumberData
    constructor(nt = AVLnodes,dt = NumberData){
        this.nodetype=nt;
        this.datatype=dt;
    }
    nodeHeight(node){
        if(node == null){
            return -1;
        }
        let leftHeight=this.nodeHeight(node.left);
        let rightHeight=this.nodeHeight(node.right);
        if(leftHeight>rightHeight) return leftHeight+1;
        else return rightHeight+1;
    }
    nodebf(node){
        if(node==null){
            return 0;
        }
        return this.nodeHeight(node.left)-this.nodeHeight(node.right);
    }
    leftRotate(node){
        let r=node.right;
        let t=r.left;
        r.left=node;
        node.right=t;
        return r;
    }
    rightRotate(node){
        let r=node.left;
        let t=r.right;
        r.right=node;
        node.left=t;
        return r; 
    }
    insert(newData){
        this.root = this.insertR(this.root,new this.datatype(newData));
    }
    insertR(r,newDataNode){
        if(r==null){
            return this.createNode(newDataNode);
        }
        if(newDataNode.cmp(r.data) == 1){
            r.right = this.insertR(r.right,newDataNode)
        }
        else if(newDataNode.cmp(r.data) == -1){
            r.left = this.insertR(r.left,newDataNode)
        }
        else{
            throw "duplicate value";
        }
        let bf=this.nodebf(r);
        if(bf>1&&r.left.data.cmp(newDataNode) == 1){
            return this.rightRotate(r);
        }
        else if(bf<-1&&r.right.data.cmp(newDataNode) == -1){
            return this.leftRotate(r);
        }
        else if(bf>1&&r.left.data.cmp(newDataNode) == -1){
            r.left=this.leftRotate(r.left);
            return this.rightRotate(r);
        }
        else if(bf<-1&&r.right.data.cmp(newDataNode) == 1){
            r.right=this.rightRotate(r.right);
            return this.leftRotate(r);
        }

        return r;
    }
    delete(deleteData){
        this.root = this.deleteR(this.root,new AVL.datatype(deleteData));
    }
    deleteR(r,deletedDataNode){
        if(r==null){
            console.log("nothing can be deleted.");
            return r;
        }
        if(deletedDataNode.cmp(r.data) == 1){
            r.right =this.deleteR(r.right,deletedDataNode)
        }
        else if(deletedDataNode.cmp(r.data) == -1){
            r.left = this.deleteR(r.left,deletedDataNode)
        }
        else{
            if(r.left == null) return r.right
            else{
                let tempNode = this.getMinValueMode(this.right);
                r.data = tempNode.data;
                r.right = this.deleteR(r.right,temp);
            }
        }
        let bf=this.nodebf(r);
        
        if(bf==2 && this.nodebf(r.left)>=0){
            return this.rightRotate(r);
        }
        else if(bf==2 && this.nodebf(r.left)==-1){
            r.left=this.leftRotate(r.left);
            return this.rightRotate(r);
        }
        else if(bf==-2 && this.nodebf(r.right)<=0){
            return this.leftRotate(r);
        }
        else if(bf==-2 && this.nodebf(r.right)==1){
            r.right=this.rightRotate(r.right);
            return this.leftRotate(r);
        }
        return r;
    }
    getMinValueMode(node){
        let current = node;
        while(current.left !==null){
            current = current.left;
        }
        return current
    }
    getTargetNode(targetDataNode){
        let current = this.root;
        while(current !== null){
            if(targetDataNode.cmp(current.data) == 1) current = current.right;
            else if(targetDataNode.cmp(current.data) == -1) current = current.left;
            else return current;
        }
        return null;
    }
    contains(targetData){
        if(targetData === undefined) return false;
        return this.getTargetNode(new this.datatype(targetData)) !== null;
    }
    InOrderTraversal(node){
        if(node == null) return;
        if(node.left !== null) this.InOrderTraversal(node.left);
        node.data.show();
        //console.log(this.nodebf(node))
        if(node.right !== null) this.InOrderTraversal(node.right);
    }
    PreOrderTraversal(node){
        if(node == null) return;
        node.data.show();
        if(node.left !== null) this.PreOrderTraversal(node.left);
        if(node.right !== null) this.PreOrderTraversal(node.right);
    }
    PostOrderTraversal(node){
        if(node == null) return;
        if(node.left !== null) this.PreOrderTraversal(node.left);
        if(node.right !== null) this.PreOrderTraversal(node.right);
        node.data.show();
    }
    show(){
        this.InOrderTraversal(this.root);
    }
    createNode(datanode){
        return new this.nodetype(datanode);
    }
}

let avl=new AVL()
avl.insert(5)
avl.insert(10)
avl.insert(8)
avl.insert(20)
avl.insert(19)
avl.insert(31)
avl.insert(50)
avl.insert(60)
avl.insert(70)
avl.show();