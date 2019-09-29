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
    const inv = n;
    let arr = new Array(n);

	for(let i = 0; i < n; ++i)
		arr[i] = (n-i)/n;

	for(let i = 0; i < inv; ++i) {
        a = i;
		let b = (Math.random()*n)|0;
		
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
    }
	
	init(arr);
    sort(arr, 0, n);
	init(arr);

	playAnim();

	return 0;
}

window.addEventListener("load", ()=>{main()});


