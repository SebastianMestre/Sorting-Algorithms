const step = 1;
const delay = 0;

function partition (arr, begin, end) {
	let p = begin + Math.floor(Math.random()*(end-begin));
	exchange(arr, begin, p);
	p = begin;
	begin++;

	let j = begin;
	for(let i = begin; i < end; ++i){
		if(compare(arr, i, p)<0)
			exchange(arr, i, j++);
	}

	exchange(arr, j-1, p);
}

function sort(arr, begin, end) {
	if(begin >= end-4)
		return;

	partition(arr, begin, end);
	partition(arr, begin, end);

	let m = begin+((end-begin)>>1);
	sort(arr, begin, m);
	sort(arr, m, end);
}

function clamp(x,low,high){
	return Math.max(low,Math.min(high,x));
}

function isort (arr, begin, end) {
	for(let i = begin; i < end; ++i){
		for(let j = i; j > begin; --j){
			if(compare(arr, j, j-1)<0)
				exchange(arr, j, j-1);
			else
				break;
		}
	}
}

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
	isort(arr, 0, n);
	init(arr);
	return 0;
}

window.addEventListener("load", ()=>{main()});


