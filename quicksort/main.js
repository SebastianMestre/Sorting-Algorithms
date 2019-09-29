const step = 1;
const delay = 10;

function upper_bound(arr, begin, end, value_pos){
    let a = begin
    let b = end;

    // upper_bound
    while(a!=b){
        let m = (a+b) >> 1;

        if(compare(arr,m,value_pos) <= 0){
            a = m+1;
        }else{
            b = m;
        }
    }

    return a;
}

function insertion_sort(arr, begin, end) {
    for (let i = begin; i < end; ++i){
        let pos = upper_bound(arr,begin,i,i);
        for (let j = i; j > pos; --j)
                exchange(arr,j,j-1);
    }
}

function unbounded_linear_insertion_sort(arr, begin, end) {
    for (let i = begin; i < end; ++i){
		for (let j = i; compare(arr, j, j-1)<0; --j)
                exchange(arr,j,j-1);
	}
}

function middle_sort(arr, begin, end) {
	const size = end - begin;
	if (size <= 1) return;
	begin += (size >> 1) - 1;
	let right = begin + 1 + (size & 1);
    for (; right < end; ++right, --begin){
		if(compare(arr,begin,right)>0) exchange(arr, begin, right);

		for (let i = right; compare(arr, i, i-1)<0; --i)
                exchange(arr,i,i-1);

		for (let i = begin; compare(arr, i, i+1)>0; ++i)
                exchange(arr,i,i+1);
    }
}

function binary_middle_sort(arr, begin, end) {
	const size = end - begin;
	if (size <= 1) return;
	begin += (size >> 1) - 1;
	let right = begin + 1 + (size & 1);
    for (; right < end; ++right, --begin){
		if(compare(arr,begin,right)>0) exchange(arr, begin, right);

        let pos = upper_bound(arr,begin,right,right);
        for (let j = right; j > pos; --j)
                exchange(arr,j,j-1);

		for (let i = begin; compare(arr, i, i+1)>0; ++i)
                exchange(arr,i,i+1);
    }
}

function partition(arr, begin, end){
	if(begin == end) return;

	let i = begin+1;
	let j = begin+1;

	while(i != end){
		if(compare(arr,begin,i)>0)
			exchange(arr,j++,i);
		i++;
	}

	exchange(arr, begin, j-1);

	return j-1;
}

function push_heap(arr,begin,end){
	const n = end-begin;
	if (n<1) return;
	const parent = begin+((n-1)>>1);
	if(compare(arr,parent,end)>0){
		exchange(arr,parent,end);
		push_heap(arr,begin,parent);
	}
}

function make_heap(arr,begin,end){
	for(let i = begin+1; i != end; ++i)
		push_heap(arr, begin, i);
}

// Quicksort
function sort (arr, begin, end) {
	while(end-begin > 32){
		let cut = partition(arr, begin, end);
		sort(arr, cut+1, end);
		end = cut;
	}
	make_heap(arr,begin,end);
	unbounded_linear_insertion_sort(arr,begin,end);
}

function clamp(x,low,high){
	return Math.max(low,Math.min(high,x));
}

function main()
{
	const n = 256;
    const inv = n;
    let arr = new Array(n);

	for (let i = 0; i < n; ++i) {
		arr[i] = (i+1)/n;
	}

	for(let i = 0; i < inv; ++i) {
		let a = (Math.random()*n)|0;
		let b = (Math.random()*n)|0;
		
        //a = (i*n/inv)|0;
        a = i;
		let r = (Math.random()*50)|0;
//		b = clamp((a+r-25), 0, n-1);
		
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
    }
	
	init(arr);
	sort(arr, 0, n);
	//insertion_sort(arr, 0, n);
	init(arr);
	return 0;
}

window.addEventListener("load", ()=>{main()});


