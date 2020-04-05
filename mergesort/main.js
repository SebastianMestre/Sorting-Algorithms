const step = 1;
const delay = 0;

function merge(arr,a,mid,b){
	if(b-a<2)return;
	if(a==mid||mid==b)return;
	let sorted = new Array(b-a);
	let it = 0;
	let i,j;
	for(i = a, j = mid; i < mid && j < b;) {
		if(compare(arr,i,j)<0){
			sorted[it] = item(arr,i++);
		}else{
			sorted[it] = item(arr,j++);
		}
		it++;
	}
	for(; i<mid; ++i)
		sorted[it++] = item(arr,i);
	for(; j<b; ++j)
		sorted[it++] = item(arr,j);
	for(let k = a; k < b; ++k)
		assign(arr, k, sorted[k-a]);
}

function sort(arr,a,b) {
	if(b-a<2)return;
	if(b-a==2){
		if(compare(arr,a+1,a)<0)
			exchange(arr,a+1,a);
		return;
	}
	let mid = a+((b-a)>>1);
	sort(arr,a,mid);
	sort(arr,mid,b);
	merge(arr,a,mid,b);
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


