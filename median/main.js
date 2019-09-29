const step = 1;
const delay = 1;

function medianofthree (arr, a, b, c) {
    if(compare(arr, a, b) > 0)
        exchange(arr, a, b);
    if(compare(arr, b, c) > 0)
        exchange(arr, b, c);
    if(compare(arr, a, b) > 0)
        exchange(arr, a, b);
}

// Gapsort
function sort (arr, begin, end) {
    if(begin == end) return;
    let n = end - begin;
    let nover3 = (n/3) | 0;

    for(let i = 0; i < nover3; ++i){
        medianofthree(arr, begin+i, begin+i+nover3, begin+i+nover3+nover3);
    }

    let piv = sort(arr, begin+nover3, begin+nover3+nover3);

}

function clamp(x,low,high){
	return Math.max(low,Math.min(high,x));
}

function main()
{
	const n = 3**5;
    const inv = n;
    let arr = new Array(n);

	for (let i = 0; i < n; ++i) {
		arr[i] = (i+1)/n;
	}

	for(let i = 0; i < inv; ++i) {
		let a = (Math.random()*n)|0;
		let b = (Math.random()*n)|0;
		
        //a = (i*n/inv)|0;
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


