const step = 1;
const delay = 0;

function insertion_sort(arr, begin, end) {
    for (let i = begin; i < end; ++i){
		for (let j = i; j > begin && compare(arr, j, j-1) <0; --j)
			exchange(arr,j,j-1);
    }
}

function partition(arr, begin, end){
	if(begin == end) return;

	let l = begin+1;
	let r = end;

	while(l<r){
		while(l < r && compare(arr, l  , begin)<=0) l += 1;
		while(l < r && compare(arr, r-1, begin)> 0) r -= 1;
		if(l < r) {
			exchange(arr, l, r-1);
			l += 1;
			r -= 1;
		}
	}

	exchange(arr, begin, l-1);

	return l-1;
}

// Quicksort
function sort (arr, begin, end) {
	if(end-begin <= 8){
		insertion_sort(arr,begin,end);
		return;
	}

	let cut = partition(arr, begin, end);
	sort(arr, begin, cut);
	sort(arr, cut+1, end);
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


