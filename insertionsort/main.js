
// Insertion sort
function sort (arr, begin, end) {

	for (let i = begin; i < end; i += 1)
		for (let j = i - 1; j >= begin; j -= 1)
			if (compare(arr, j, j+1)>0)
				exchange(arr, j, j+1);
			else break;
}

function main() {
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


