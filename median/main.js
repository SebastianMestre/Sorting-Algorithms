const step = 1;
const delay = 0;

function medianofthree (arr, a, b, c) {
    if(compare(arr, a, b) > 0)
        exchange(arr, a, b);
    if(compare(arr, b, c) > 0)
        exchange(arr, b, c);
    if(compare(arr, a, b) > 0)
        exchange(arr, a, b);
}

function sort (arr, begin, end) {
    if(begin == end) return;
    let n = end - begin;
    let nover3 = (n/3) | 0;

    for(let i = 0; i < nover3; ++i){
        medianofthree(arr, begin+i, begin+i+nover3, begin+i+nover3+nover3);
    }

    let piv = sort(arr, begin+nover3, begin+nover3+nover3);

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


