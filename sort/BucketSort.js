function InsertSort(arr,left/*start index */,right/*end index */){
    for(let i=left+1;i<right+1;i++){
        let pos=i-1;
        let value=arr[i];
        while(arr[pos]>=value&&pos>=left){
            arr[pos+1]=arr[pos];
            pos--;
        }
        arr[pos+1]=value;
    }
}
function hash(value){
    return Math.floor(value/3);
}
function bucketSort(arr){
    let buckets=[];
    for(let i=0;i<arr.length;i++){
        let hashValue=hash(arr[i]);
        if(!Array.isArray(buckets[hashValue])) buckets[hashValue] = [];
        buckets[hashValue].push(arr[i]);
    }
    for(let i=0;i<buckets.length;i++){
        if(Array.isArray(buckets[i])){
            InsertSort(buckets[i],0,buckets[i].length-1);
            console.log(buckets[i]);
        }
    }
    return buckets.flat();
}