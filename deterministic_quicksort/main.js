const step = 1;
const delay = 0;

// Quicksort (deterministic-nlogn-time pivot selection)
function sort (arr, begin, end) {
	if(end-begin < 2)
		return;

	const pivot = median_of_medians(arr, begin, end);
	exchange(arr, begin, pivot);

	let cut = partition(arr, begin+1, end, it => compare(arr, it, begin) <= 0);

	exchange(arr, begin, cut-1);
	sort(arr, begin, cut-1);
	sort(arr, cut, end);
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


