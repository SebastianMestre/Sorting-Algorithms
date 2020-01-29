const step = 1;
const delay = 10;

function insertion_sort(arr, begin, end) {
    for (let i = begin; i < end; ++i){
		for (let j = i; j > begin && arr[j] < arr[j-1]; --j)
			exchange(arr,j,j-1);
    }
}

function partition(arr, begin, end){
	if(begin == end) return;

	let j = begin;
	for(let i = begin+1; i != end; ++i){
		if(compare(arr, begin, i)>0) {
			j += 1;
			exchange(arr, j, i);
		}
	}

	exchange(arr, begin, j);

	return j;
}

// Quicksort
function sort (arr, begin, end) {
	if(end-begin <= 8){
		insertion_sort(arr,begin,end);
		return;
	}

	let cut = partition(arr, begin, end);
	sort(arr, begin, cut);
	sort(arr, cut+1, end);
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


