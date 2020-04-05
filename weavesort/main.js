const step = 1;
const delay = 0;

function weave(arr, begin, pivot, end) {
    if (end-begin <= 2) return;

    let m1 = begin + (((pivot - begin)/2)|0);
    let m2 = pivot + (((end - pivot)/2)|0);
    
    let r = rotate(arr, m1, pivot, m2);
   
    weave(arr, begin, m1, r);
    weave(arr, r, m2, end);
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
    if (end - begin <= 8) {
		insertionsort(arr,begin,end);
		return;
	}
		
    let mid = begin+(((end-begin)/2)|0);
    weavesort(arr,begin, mid);
    weavesort(arr,mid, end);

    weave(arr,begin, mid, end);
    
	insertionsort(arr, begin, end);
}

function main()
{
	const n = 256;

	let arr = make_array(n);
	shuffle(arr);

	init(arr);
    weavesort(arr, 0, n);
	init(arr);
		
	return 0;
}

window.addEventListener("load", ()=>{main()});

