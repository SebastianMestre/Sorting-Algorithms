const step = 1;
const delay = 0;

function deterministic_select (arr, begin, end, k) {
	while (1){
		if(end-begin <= 1) return;
		let n = end - begin;
		let groupCount = (n/5) | 0;

		let i = 0;
		for(let j = 0; j+5 <= n; j += 5, i += 1){
			insertion_sort(arr, begin+j, begin+j+5);
			exchange(arr, begin+i, begin+j+2);
		}

		deterministic_select(arr, begin, begin+i, i>>1);
		exchange(arr, begin, begin+(i>>1));
		let cut = partition(
			arr, begin+1, end, it => compare(arr, it, begin) <= 0);
		exchange(arr, begin, cut-1);

		const pivot_idx = cut-1-begin;
		if (pivot_idx < k) {
			k -= cut-begin;
			begin = cut;
		} else {
			end = cut;
		}
	}
}

function main() {
	const n = 5**3;

	let arr = make_array(n);
	shuffle(arr);

	init(arr);
	deterministic_select(arr, 0, n, n>>1);
	init(arr);

	playAnim();

	return 0;
}

window.addEventListener("load", ()=>{main()});


