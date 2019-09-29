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

const delay = 10;
const step = 1;

function main()
{
	const n = 256;
	const inv = n;
    let arr = new Array(n);

	for (let i = 0; i < n; ++i) {
		arr[i] = (i+1)/n;
	}

	for(let i = 0; i < inv; ++i) {
		let a = (Math.random()*n)|0;
		let b = (Math.random()*n)|0;
		
		a = (i*n/inv)|0;
		a = i;
		let r = (Math.random()*50)|0;
//		b = clamp((a+r-25), 0, n-1);
		
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}
	
	init(arr);
	sort(arr, 0, n);
	init(arr);
	return 0;
}

window.addEventListener("load", ()=>{main()});


