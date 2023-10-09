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
    return arr;
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
    console.log(arr,left,right)
    if(k <= left + 1) return arr[k-1];
    else return medianOfMedian(arr,left,k-1);
}
function BFPRT(arr,left,right/*end index */,k/*第幾大 */){
    //取中位數之中位數
    let PivotValue = medianOfMedian(arr,left,right);
    //取得該值位置
    let pivotIndex = arr.indexOf(PivotValue);
    //分割陣列，取得分割位置。回傳值為第x大
    let splitPivotIndex = partition(arr,left,right,pivotIndex);
    //若k > x，代表要找x+1 ~ right範圍中的第k大
    //若k < x，代表要找left ~ x-1範圍中的第k大
    //若k = x 回傳arr[x]
    if(k>splitPivotIndex) return BFPRT(arr,splitPivotIndex+1,right,k);
    else if(k<splitPivotIndex) return BFPRT(arr,left,splitPivotIndex-1,k);
    else return arr[k];
}