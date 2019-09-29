
function reverse(arr, begin, end) {
	for(let i = begin, j = end-1; i < j; ++i, --j) {
		exchange(arr, i, j);
	}
}

function rotate(arr, begin, mid, end) {
	reverse(arr, begin, mid);
	reverse(arr, mid, end);
	reverse(arr, begin, end);
	return begin + (end - mid);
}

function optimized_weave(arr, begin, pivot, end) {
    if (end-begin <= 2) return;
	if (compare(arr, pivot-1, pivot)<0) return;


    let m1 = begin + (((pivot - begin)/2)|0);
    let m2 = pivot + (((end - pivot)/2)|0);
    
    let r = rotate(arr, m1, pivot, m2);
   
    optimized_weave(arr, begin, m1, r);
    optimized_weave(arr, r, m2, end);
}

function insertionsort(arr, begin, end) {
    if(begin == end) return;
    for(let it = begin+1; it != end; ++it) {
        for(let sub_it = it; sub_it != begin; --sub_it) {
			if(compare(arr, sub_it ,sub_it-1)<0){
				exchange(arr, sub_it ,sub_it-1);
			}else
                break;
        }
    } 
}

function weavesort(arr, begin, end) {
    if (end - begin < 32) {
		insertionsort(arr,begin,end);
	}
		
	if (end - begin < 2)
        return;
    
    if (end - begin == 2){
		if(compare(arr, begin+1, begin)<0){
			exchange(arr, begin+1, begin);
		}
        return;
    }
    
    let mid = begin+(((end-begin)/2)|0);
    weavesort(arr,begin, mid);
    weavesort(arr,mid, end);

    optimized_weave(arr,begin, mid, end);
    
	insertionsort(arr, begin, end);
}

const step = 1;
const delay = 0;
function main()
{
	const n = 256+512;
	const inv = n;
    let arr = new Array(n);

	const logi = x => 1 / (1+Math.exp(-x));

	for (let i = 0; i < n; ++i) {
		arr[i] = logi((i/n-0.5)*10);
	}
    
	for(let i = 0; i < inv; ++i) {
		let a = i;//(Math.random()*n)|0;
		let b = (Math.random()*n)|0;
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}

	init(arr);
    weavesort(arr, 0, n);
	init(arr);
		
	return 0;
}

window.addEventListener("load", ()=>{main()});

