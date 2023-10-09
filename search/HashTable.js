class HashTable {
    data = {};
    deleted = {};
    size = 0;
    nowVolumn = 0;
    rehashFx = 0.7;
    probeLinearFx = 1;
    probeQuadraticFx = 0.5;
    probeDowbleHashFx
    probeDHash = v => v;
    hash;
    ProbeFunc
    constructor(s,probeType) {
        this.size = s;
        this.hash = value => value % this.size;
        switch(probeType){
            case "L"://Linear
                this.ProbeFunc = this.probe_Linear
                break;
            case "Q"://Quadratic
                this.ProbeFunc = this.probe_Quadratic
                break;
            case "D"://Double Hash
                this.probeDowbleHashFx = (Math.random()*(this.size - 1))|0; // 與質數size任何一數都是互質
                this.probeDHash = value => value % this.probeDowbleHashFx;
                //若a與b互質，那麼(a×i)modb,fori=0,1...,b−1，正好可以形成{0,1,...,b−1}的排列組合(permutation)。
                this.ProbeFunc = this.probe_doublehash
                break;
        }
    }
    // getIndex(index){
    //     while(index >= this.size){
    //         index = index - this.size;
    //     }
    //     //index = index % this.size;
    //     while(index < 0){
    //         index = index + this.size;
    //     }
    //     return index;
    // }
    probe_Linear(value, i) {
        let newIndex = (this.hash(value) + this.probeLinearFx * i) % this.size;
        while (newIndex < 0) {
            newIndex += this.size;
        }
        return newIndex;
    }
    probe_Quadratic(value, i) {
        let newIndex = (this.hash(value) + this.probeQuadraticFx * i + this.probeQuadraticFx * i ** 2) % this.size;
        while (newIndex < 0) {
            newIndex += this.size;
        }
        return newIndex;
    }
    probe_doublehash(value, i) {
        let newIndex = (this.hash(value) + this.probeDHash(value) * i) % this.size;
        while (newIndex < 0) {
            newIndex += this.size;
        }
        return newIndex;
    }
    get loadFactor(){
        return this.nowVolumn/this.size;
    }
    add(value) {
        let insertedIndex = this.search(value);
        if(insertedIndex == -this.size){
            //滿了沒位置了
            return -this.size;
        }
        else if(insertedIndex < 0){
            //找到空位可以插入
            this.data[-insertedIndex] = value;
            this.deleted[-insertedIndex] = false;
            this.nowVolumn ++ ;
            return -insertedIndex;
        }
        else{
            //此值已被插入過
            return -insertedIndex;
        }
    }
    delete(value){
        let insertedIndex = this.search(value);
        if(insertedIndex == -this.size){
            //找不到要刪除的對象
            return -this.size;
        }
        else if(insertedIndex > 0){
            //找到目標進行刪除(設為delete標示，避免斷鏈)
            this.deleted[insertedIndex] = true;
            this.nowVolumn -- ;
            return insertedIndex;
        }
        else{
            //找到空白，該值未被新增過
            return insertedIndex;
        }
    }
    search(target){
        let size = this.size;
        for (i = 0, hk = this.hash(target); i < size; i++, hk = this.ProbeFunc(hk,i)) {
            if (this.data[hk] === undefined || this.deleted[hk]) {
                //找到了空位
                return -i;
            }
            if (this.data[hk] !== undefined && !this.deleted[hk]) {
                //找到了
                return i;
            }
        }
        return -this.size;//滿了沒位置了
    }
    rehash(){
        
    }
}
