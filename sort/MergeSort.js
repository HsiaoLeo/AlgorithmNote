function MergeSort(arr,result,left/*start index */,right/*end index */){
    if(left==right) return;
    else if(right-left == 1){
        if(result[left]>result[right])
            [result[right],result[left]]=[result[left],result[right]];
        return;
    }
    let mid = Math.floor((right+left)/2)
    MergeSort(result,arr,left,mid);
    MergeSort(result,arr,mid+1,right);
    let index=left;
    let arr1Index=left;
    let arr2Index=mid+1;
    while(index<=right){
        if(arr2Index>right|| arr[arr1Index] < arr[arr2Index]&&arr1Index<=mid){
            result[index++]=arr[arr1Index++];
        }
        else{
            result[index++]=arr[arr2Index++];
        }
    }
}
function MergeSort_js(arr){
    if(arr.length <= 1) return arr;
    let arr1=[];
    let arr2=[];
    let arr_result=[];
    let mid=Math.floor(arr.length/2);
    arr.forEach((n,i)=>{
        if(i<mid)arr1.push(n);
        else arr2.push(n);
    })
    arr1=MergeSort_js(arr1);
    arr2=MergeSort_js(arr2);
    while(arr1.length>0||arr2.length>0){
        let value1=arr1[0];
        let value2=arr2[0];
        if(value1<value2&&arr1.length>0){
            arr_result.push(arr1.shift())
        }
        else{
            arr_result.push(arr2.shift())
        }
    }
    return arr_result;
}
let arr=Array.from({length:10000},()=>((Math.random()-0.5)*20000)|0);
let arr2=arr.map(v=>v);
console.log(arr);
console.time("merge")
let copy = arr.map(v=>v);
MergeSort(copy,arr,0,9999)
console.timeEnd("merge")
console.log(arr2);
console.time("merge2")
MergeSort_js(arr2)
console.timeEnd("merge2")