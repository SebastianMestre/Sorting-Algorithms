const step = 1;
const delay = 0;

function sort(arr, begin, end) {
	while (begin < end) {
		let max_idx = begin;
		for (let i = begin; i != end; ++i) {
			if (compare(arr, i, max_idx) > 0) {
				max_idx = i;
			}
		}
		exchange(arr, max_idx, --end);
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


