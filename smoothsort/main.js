const step = 1;
const delay = 0;

function num (n){
	let a = 1;
	let b = 1;
	
	while(b <= n){
		let next = a+b+1;
		a = b;
		b = next;
	}
	return a;
}

function heap_sift (arr, begin, end) {
	let n = end-begin;

	if (n < 2) return;
	//console.log(n);

	let last_child_end = end-1;
	
	let first_child_begin = begin;
	let first_child_end = begin + num(last_child_end-first_child_begin);
	
	let max_child_begin = first_child_begin;
	let max_child_end = last_child_end;
	
	let current_child_begin = first_child_begin;
	let current_child_end = first_child_end;
	while(current_child_end < last_child_end){
		if (compare(arr, max_child_end-1, current_child_end-1)<0) {
			max_child_begin = current_child_begin;
			max_child_end = current_child_end;
		}
		current_child_begin = current_child_end;
		current_child_end = current_child_begin + num(last_child_end - current_child_begin);
	}

	let last_child_begin = current_child_begin;
	
	if(max_child_end == last_child_end)
		max_child_begin = last_child_begin;

	if(compare(arr,end-1, max_child_end-1)<0){
		exchange(arr, end-1, max_child_end-1);
		heap_sift(arr, max_child_begin, max_child_end);
	}
}

function heap_pop (arr, begin, end) {
	const n = end-begin;

	if(n<2) return;

	let last_child_end = end-1;
	
	let first_child_begin = begin;
	let first_child_end = begin + num(last_child_end-first_child_begin);
	
	let max_child_begin = first_child_begin;
	let max_child_end = last_child_end;
	
	let current_child_begin = first_child_begin;
	let current_child_end = first_child_end;
	while(current_child_end < last_child_end){
		if (compare(arr,max_child_end-1, current_child_end-1)<0) {
			max_child_begin = current_child_begin;
			max_child_end = current_child_end;
		}
		current_child_begin = current_child_end;
		current_child_end = current_child_begin + num(last_child_end - current_child_begin);
	}

	let last_child_begin = current_child_begin;

	if(max_child_end == last_child_end)
		max_child_begin = last_child_begin;

	if(max_child_end != last_child_end){
		exchange(arr,last_child_end-1,max_child_end-1);
		heap_sift(arr,max_child_begin,max_child_end);
	}
}

// Smoothsort
function sort (arr, begin, end) {
	for(let i = begin+2; i <= end; ++i){
		heap_sift(arr, begin, i);
	}
	console.log(updates.length);	
	for(let i = end; i > begin; --i) {
		heap_pop(arr, begin, i);
	}
}

function clamp(x,low,high){
	return Math.max(low,Math.min(high,x));
}

function main()
{
	const n = 256;

	let arr = make_array(n);
	shuffle(arr);

	init(arr);
	sort(arr, 0, n);
	init(arr);

	playAnim();

	return 0;
}

window.addEventListener("load", ()=>{main()});


