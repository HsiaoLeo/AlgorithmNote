function binarySearch_2(arr,left,right,targetValue){
    if(right-left<=1){
        if(arr[right]==targetValue) return right;
        else if(arr[left]==targetValue) return left;
        else return -1;
    }
    let mid = (left+right)/2|0;
    if(arr[mid]>targetValue) return binarySearch(arr,left,mid-1,targetValue);
    else if(arr[mid]<targetValue) return binarySearch(arr,mid+1,right,targetValue);
    else return mid;
}
function bSearch(arr,left,right,targetValue){
    while(left<=right){
        let mid = (left+right)/2|0;
        if(targetValue>arr[mid]) left=mid+1;
        else if(targetValue<arr[mid])right=mid-1;
        else return mid;
    }
    return -1;
}
function binarySearch(arr,targetValue){
    return bSearch(arr,0,arr.length-1,targetValue);
}

function ExponentialSearch(arr,targetValue){
    if(arr.length<=1){
        return arr[0]==targetValue?0:-1;
    }
    for(let left=1,right=left*2-1;left<arr.length;left*=2,right=left*2-1){
        console.log(left,right);
        let result=bSearch(arr,left,right>arr.length-1?arr.length-1:right,targetValue);
        if(result!==-1)return result;
    }
    return -1;
}

function InterpolationSearch(arr,targetValue){
    let left=0,right=arr.length-1;
    while(right>=left){
        let x=(targetValue-arr[left])*(right-left)/(arr[right]-arr[left])+left|0;
        if(x>right||x<left)break;
        if(targetValue>arr[x])left=x+1;
        else if(targetValue<arr[x])right=x-1;
        else return x;
    }
    return -1;
}