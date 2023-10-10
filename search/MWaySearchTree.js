//https://www.geeksforgeeks.org/m-way-search-tree-set-2-insertion-and-deletion/
function bSearchWithDataNode(arr,left,right,targetValue){
    while(left<=right){
        let mid = (left+right)/2|0;
        if(targetValue.cmp(arr[mid])==1) left=mid+1;
        else if(targetValue.cmp(arr[mid])==-1)right=mid-1;
        else return mid;
    }
    return -1;
}
function bSearchGapWithDataNode(arr,left,right,targetValue){
    while(left<=right){
        let mid = (left+right)/2|0;
        if(targetValue.cmp(arr[mid])==1) {
            left=mid+1;
            if(left == right){
                return left;
            }
        }
        else if(targetValue.cmp(arr[mid])==-1){
            right=mid-1;
            if(left == right){
                return mid;
            }
        }
        else return mid;
    }
}
function binarySearch(arr,targetValue){
    return bSearchWithDataNode(arr,0,arr.length-1,targetValue);
}

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
class MWTNodes{
    keyArr=[] //keyvolume length,NumberData type
    childNodesArr=[]//degree length,MWTNodes type
    keyCount
    constructor(data,kv){
        //this.keyArr.push(new MWTNodes(data));
        this.keyArr = Array.from({length:kv},_=>null);
        this.childNodesArr = Array.from({length:kv+1},_=>null);
        this.keyArr[0] = data;
        this.keyCount = 1;
    }
    
    insertKey(data){
        if(this.isFull) return -1;
        let i;
        for(i=0;i<this.keyCount;i++){
            if(data.cmp(this.keyArr[i])==-1){
                for(let j=this.keyArr.length-1;j>i;j--){
                    this.keyArr[j]=this.keyArr[j-1];
                    this.childNodesArr[j+1]=this.childNodesArr[j];
                    this.childNodesArr[j]=this.childNodesArr[j-1];
                }
                break;
            }
        }
        this.keyArr[i] = data;
        this.childNodesArr[i] = null
        this.keyCount ++;
        return i;
    }
    deleteKey(data){
        let i = bSearchWithDataNode(this.keyArr,0,this.keyCount-1,data);
        if(this.childNodesArr[i]==null && this.childNodesArr[i+1]==null){
            for(let j=i;j<this.keyArr.length-1;j++){
                this.keyArr[j] = this.keyArr[j+1];
                this.childNodesArr[j]=this.childNodesArr[j+1];
                this.childNodesArr[j+1]=this.childNodesArr[j+2];
            }
            this.keyCount --;
        }
        return i;
    }
    searchKey(data){
        return bSearchWithDataNode(this.keyArr,0,this.keyCount-1,data);
    }
    //若未找到適當child return 0
    searchChildNode(data){
        if(data == null) return 0;
        let i;
        for(i=0;i<this.keyCount;i++){
            if(data.cmp(this.keyArr[i]) == -1){
                return i;
            }
        }
        return i;
        //return bSearchGapWithDataNode(this.keyArr,0,this.keyCount,data);
    }
    fetchMinChild(){
        return this.childNodesArr[0];
    }
    fetchMaxChild(){
        return this.childNodesArr[this.keyCount];
    }
    // show(){
    //     for(i=0;i<this.keyCount;i++){
    //         console.log(this.keyArr[i]);
    //     }
    // }
    get isFull(){
        return this.keyCount == this.keyArr.length;
    }
    get isEmpty(){
        return this.keyCount == 0;
    }
}
class MWayTree{
    root=null
    nodetype = MWTNodes
    datatype = NumberData
    degree
    constructor(d,nt = MWTNodes,dt = NumberData){
        this.degree = d;
        this.nodetype=nt;
        this.datatype=dt;
    }
    insert(dataValue){
        if(this.search(dataValue)!== null){
            console.log("no support duplicate!!");
            return;
        }
        this.root = this.insertR(this.root,new this.datatype(dataValue));
    }
    insertR(r,data){
        if(r == null){
            return new MWTNodes(data,this.degree-1);
        }
        let insertIndex = r.insertKey(data);
        //if(insertIndex !== -1) return r;
        if(insertIndex == -1){
            let childIndex = r.searchChildNode(data);
            r.childNodesArr[childIndex] = this.insertR(r.childNodesArr[childIndex],data);
        }
        return r;
    }
    delete(dataValue){
        if(this.search(dataValue)== null){
            console.log("can not delete not found value!!");
            return;
        }
        this.root = this.deleteR(this.root,new this.datatype(dataValue));
    }
    deleteR(r,data){
        if(r == null){
            return r;
        }
        let deleteIndex = r.deleteKey(data);
        if(deleteIndex !== -1) {
            //delete
            if(r.isEmpty) return null;
            if(r.childNodesArr[deleteIndex] !== null){
                let tempData = this.fetchMaxNode(r.childNodesArr[deleteIndex]);
                r.keyArr[deleteIndex] = tempData
                r.childNodesArr[deleteIndex] = this.deleteR(r.childNodesArr[deleteIndex],tempData);
            }
            else if(r.childNodesArr[deleteIndex+1] !== null){
                let tempData = this.fetchMinNode(r.childNodesArr[deleteIndex+1]);
                r.keyArr[deleteIndex] = tempData
                r.childNodesArr[deleteIndex+1] = this.deleteR(r.childNodesArr[deleteIndex+1],tempData);
            }
        }
        else{
            let childIndex = r.searchChildNode(data);
            r.childNodesArr[childIndex] = this.deleteR(r.childNodesArr[childIndex],data);
        }
        return r;
    }
    search(dataValue){
        return this.searchR(this.root,new this.datatype(dataValue));
    }
    searchR(r,data){
        if(r==null){
            return null;
        }
        let targetIndex = r.searchKey(data);
        if(targetIndex!==-1)return r.keyArr[targetIndex];
        else{
            let childIndex = r.searchChildNode(data);
            return this.searchR(r.childNodesArr[childIndex],data);
        }
    }
    fetchMinNode(mwaymode){
        let current = mwaymode;
        while(current.fetchMinChild() !== null){
            current = current.fetchMinChild();
        }
        return current.keyArr[0];
    }
    fetchMaxNode(mwaymode){
        let current = mwaymode;
        while(current.fetchMaxChild() !== null){
            current = current.fetchMaxChild();
        }
        return current.keyArr[current.keyCount-1];
    }
    // show(){

    // }
}

let mway=new MWayTree(3);
let inserted = [14,32,11,6,7,4,3,88,93,54,37,21,17,89,62,64,75,35,36];
inserted.forEach(d=>{
    mway.insert(d);
})
console.log(mway.search(3));
console.log(mway.search(37));
console.log(mway.search(54));
console.log(mway.search(14));
mway.delete(3);
console.log(mway.search(3));
console.log(mway.search(37));
console.log(mway.search(54));
console.log(mway.search(14));
mway.delete(37);
console.log(mway.search(3));
console.log(mway.search(37));
console.log(mway.search(54));
console.log(mway.search(14));
mway.delete(54);
console.log(mway.search(3));
console.log(mway.search(37));
console.log(mway.search(54));
console.log(mway.search(14));
mway.delete(14);
console.log(mway.search(3));
console.log(mway.search(37));
console.log(mway.search(54));
console.log(mway.search(14));
//avl.show();