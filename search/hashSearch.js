class HashTable{
    data={}
    deleted={}
    size=0
    probeFx=1
    hash
    constructor(s){
        this.size = s;
    }
    getIndex(index){
        while(index >= this.size){
            index = index - this.size;
        }
        while(index < 0){
            index = index + this.size;
        }
        return index;
    }
    probe_Linear(i){
        return this.getIndex(i+this.probeFx);
    }
    probe_doublehash(){

    }
    addP(value,probeF){
        let size=this.size;
        for(i=0,hk=this.hash(value);i<size;i++,hk=probeF(hk)){
            if(this.data[hk] === undefined || this.deleted[hk]){
                this.data[hk]=value;
                this.deleted[hk]=false;
                return i;
            }
            if(this.data[hk]!==undefined && !this.deleted[hk]){
                //重複值
                return i;
            }
        }
        return null;
    }
    deleteP(value,probeF){
        let size=this.size;
        for(i=0,hk=this.hash(value);i<size;i++,hk=probeF(hk)){
            if(this.data[hk] === undefined) return -i;
            if(this.data[hk] === value && !this.deleted[hk]){
                this.deleted[hk]=false;
                return i;
            }
        }
        return null;
    }
}