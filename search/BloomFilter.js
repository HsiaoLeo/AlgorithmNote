//https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

class BloomFilter{
    hashfArray=[]
    //bits=0 這方法看起來會讓js number爆掉，改用陣列
    bitArray={}
    constructor(size,hashCount=1){
        for(let i=0;i<hashCount;i++){
            let seed = (Math.random()*size)|0;
            this.hashfArray.push(v=>cyrb53(v,seed)%size);
        }
    }
    add(str){
        this.hashfArray.forEach(hs => {
            //this.bits |= 1<<hs(str);
            this.bitArray[hs(str)]=1;
        })
    }
    contains(str){
        // for(let hs of this.hashfArray){
        //     console.log(this.bits & 1 << hs(str))
        //     if(this.bits & 1 << hs(str)==0)return false;
        // }
        let checkArr = this.hashfArray.map(hs => this.bitArray[hs(str)]??0);
        return checkArr.reduce((r,c)=>r&c)==1//1:maybe contains,0:not contains
        //return true;//maybe contain
    }
}
let charArr = Array.from({length:10},(_,i)=>48+i).concat(Array.from({length:26},(_,i)=>65+i)).concat(Array.from({length:26},(_,i)=>97+i)).map(code=>String.fromCharCode(code))
let wordArr = Array.from(new Set(Array.from({length:100000},()=>Array.from({length:Math.random()*20|0+2},()=>charArr[Math.random()*62|0]).join(''))))
let pivot = wordArr.length/2|0;
let addedWordArr=[],notintWordArr =[];
wordArr.forEach((word,i)=>{
    if(i<pivot) addedWordArr.push(word);
    else notintWordArr.push(word);
})
let bf=new BloomFilter(Number.MAX_SAFE_INTEGER,10);
addedWordArr.forEach(word=>{
 bf.add(word);   
})

console.log(notintWordArr.length,notintWordArr.map(w=>bf.contains(w)).filter(r=>r==false).length)
console.log(addedWordArr.length,addedWordArr.map(w=>bf.contains(w)).filter(r=>r==true).length)
