function gapped_insertion_sort (arr, begin, end, gap) {
	for (let i = begin; i < end; i += 1)
		for (let j = i - gap; j >= begin; j -= gap)
			if (compare(arr, j, j+gap)>0)
				exchange(arr, j, j+gap);
			else break;
}

// Gapsort
function sort (arr, begin, end) {
	const gaps = [701,301,132,57,23,10,4,1];

	for(const gap of gaps)
		gapped_insertion_sort(arr, begin, end, gap);
}

function clamp(x,low,high){
	return Math.max(low,Math.min(high,x));
}

function main() {
	const n = 512;

	let arr = make_array(n);
	shuffle(arr);

	init(arr);
    sort(arr, 0, n);
	init(arr);

	playAnim();

	return 0;
}

window.addEventListener("load", ()=>{main()});


