
// Heapsort
function sort (arr, begin, end) {

	const n = end - begin;

	for (let i = 0; i < n; ++i) {
		let j = i;
		while (j > 0) {
			let k = (j-1) >> 1;
			if (cmp(j, k) < 0) break;
			swp(j, k);
			j = k;
		}
	}

	for (let i = n-1; i >= 1; --i) {
		swp(0, i);
		let j = 0;
		while (j*2+1 < i) {
			let k = j*2+2<i && cmp(j*2+2, j*2+1)>0 ? j*2+2 : j*2+1;
			if (cmp(j, k) > 0) break;
			swp(j, k);
			j = k;
		}
	}

	function swp(i, j) {
		exchange(arr, begin+i, begin+j);
	}

	function cmp(i, j) {
		return compare(arr, begin+i, begin+j);
	}
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


