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
    //return arr;
}
function partition(arr,left,right/*end index */,pivotIndex){
    let value=arr[pivotIndex];
    let store=left;
    [arr[pivotIndex],arr[right]]=[arr[right],arr[pivotIndex]];
    for(let i=left;i<right;i++){
        if(arr[i]<value){
            [arr[store],arr[i]]=[arr[i],arr[store]];
            store++;
        }
    }
    [arr[store],arr[right]]=[arr[right],arr[store]];
    return store;
}
function medianOfMedian(arr,left,right/*end index */){
    let index=left;
    let k=left;
    while(index+4<=right){
        InsertSort(arr,index,index+4);
        [arr[k],arr[index+2]]=[arr[index+2],arr[k]];
        k++;
        index+=5;
    }
    if(index<=right){
        InsertSort(arr,index,right);
        [arr[k],arr[index + ((right-index+1)/2)|0]]=[arr[index + ((right-index+1)/2)|0],arr[k]];
        k++;
    }
    if(k <= left + 1) return arr[left];
    else return medianOfMedian(arr,left,k-1);
}
function QuickSort_Random(arr,left,right){
    if(left > right) return;
    let pivotIndex = ((Math.random()*(right-left+1)+left)|0);
    let splitPivotIndex = partition(arr,left,right,pivotIndex);
    QuickSort_Random(arr,left,splitPivotIndex-1);
    QuickSort_Random(arr,splitPivotIndex+1,right);
}
function QuickSort_BFPRT(arr,left,right){
    if(left > right) return;
    //取中位數之中位數
    let PivotValue = medianOfMedian(arr,left,right);
    //取得該值位置
    let pivotIndex = arr.indexOf(PivotValue);
    //分割陣列，取得分割位置。回傳值為第x大
    let splitPivotIndex = partition(arr,left,right,pivotIndex);
    QuickSort_BFPRT(arr,left,splitPivotIndex-1);
    QuickSort_BFPRT(arr,splitPivotIndex+1,right);
}
function Qcuicksort_Random_WithInsert(arr,left,right){
    if(left > right) return;
    let pivotIndex = ((Math.random()*(right-left+1)+left)|0);
    let splitPivotIndex = partition(arr,left,right,pivotIndex);
    if(splitPivotIndex-left<=8)
        InsertSort(arr,left,splitPivotIndex-1)
    else
        QuickSort_Random(arr,left,splitPivotIndex-1);
    if(right-splitPivotIndex<=8)
        InsertSort(arr,splitPivotIndex+1,right)
    else
        QuickSort_Random(arr,splitPivotIndex+1,right);
}
function QuickSort_BFPRT_WithInsert(arr,left,right){
    if(left > right) return;
    //取中位數之中位數
    let PivotValue = medianOfMedian(arr,left,right);
    //取得該值位置
    let pivotIndex = arr.indexOf(PivotValue);
    //分割陣列，取得分割位置。回傳值為第x大
    let splitPivotIndex = partition(arr,left,right,pivotIndex);
    if(splitPivotIndex-left<=7)
        InsertSort(arr,left,splitPivotIndex-1)
    else
        QuickSort_BFPRT(arr,left,splitPivotIndex-1);
    if(right-splitPivotIndex<=7)
        InsertSort(arr,splitPivotIndex+1,right)
    else
        QuickSort_BFPRT(arr,splitPivotIndex+1,right);
}

let arr=Array.from({length:50000},()=>((Math.random()-0.5)*100000)|0)
let arr1=arr.map(v=>v)
let arr2=arr.map(v=>v)

console.time("arr1");
QuickSort_BFPRT_WithInsert(arr1,0,49999);
console.timeEnd("arr1");
console.time("arr2");
QuickSort_BFPRT(arr2,0,49999);
console.timeEnd("arr2");