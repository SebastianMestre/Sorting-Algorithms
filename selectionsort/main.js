const step = 1;
const delay = 0;

function sort(arr, begin, end) {
	if(begin >= end) return;
	for (let j = begin; j != end; ++j){
		let min_idx = j;
		for (let i = j; i != end; ++i){
			if (compare(arr,i,min_idx)<0){
				min_idx = i;
			}
		}
		exchange(arr, j, min_idx);
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
	return 0;
}

window.addEventListener("load", ()=>{main()});


