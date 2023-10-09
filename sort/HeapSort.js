function heapify(arr,parentIndex,right){
    let largestIndex = parentIndex;
    let leftChildIndex = parentIndex*2+1;
    let rightChildIndex = parentIndex*2+2;
    if(leftChildIndex<right&&arr[leftChildIndex]>arr[parentIndex]){
        largestIndex=leftChildIndex;
    }
    if(rightChildIndex<right&&arr[rightChildIndex]>arr[largestIndex]){
        largestIndex=rightChildIndex;
    }
    if(largestIndex!=parentIndex){
        [arr[largestIndex],arr[parentIndex]]=[arr[parentIndex],arr[largestIndex]];
        heapify(arr,largestIndex,right);
    }
}
function buildHeap(arr){
    console.log()
    for(let i=Math.floor(arr.length/2)-1;i>=0;i--){
        heapify(arr,i,arr.length);
    }
}
function HeapSort(arr){
    buildHeap(arr);
    for(i=arr.length-1;i>0;i--){
        [arr[i],arr[0]]=[arr[0],arr[i]];
        heapify(arr,0,i);
    }
}