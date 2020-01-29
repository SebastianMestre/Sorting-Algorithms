const step = 1;
const delay = 0;

function sort(arr, begin, end) {
	if(begin == end) return;
	for (let i = begin; i != end; ++i)
		if (compare(arr,i,begin)<0)
			exchange(arr, i, begin);
	for (let i = end-1; i!=begin-1; --i)
		if (compare(arr, i, end-1)>0)
			exchange(arr, i, end-1);
	sort(arr, begin+1, end-1);
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


