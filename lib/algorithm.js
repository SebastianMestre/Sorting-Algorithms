
function gcd (m, n) {
	while (n!=0) { let t = m % n; m=n; n=t; }
	return m;
}

function reverse (arr, from, to) {
	while (from < to) {
		exchange(arr, from++, to--);
	}
}

function rotate (arr, from, mid, to) {
	let retval = from + (to - mid);
	if (from==mid || mid==to) return retval;
	let n = gcd(to - from, mid - from);
	while (n-- != 0) {
		let val = item(arr, from+n);
		let shift = mid - from;
		let p1 = from+n, p2=from+n+shift;
		while (p2 != from + n) {
			assign(arr, p1, item(arr, p2));
			p1=p2;
			if ( to - p2 > shift) p2 += shift;
			else p2=from + (shift - (to - p2));
		}
		assign(arr, p1, val);
	}
	return retval;
}

function insertion_sort(arr, begin, end) {
    for (let i = begin; i < end; ++i){
		for (let j = i; j > begin && compare(arr, j, j-1) <0; --j)
			exchange(arr,j,j-1);
    }
}

function deterministic_select (arr, begin, end, k) {
	while (1){
		if(end-begin <= 1) return;
		let n = end - begin;
		let groupCount = (n/5) | 0;

		let i = 0;
		for(let j = 0; j+5 <= n; j += 5, i += 1){
			insertion_sort(arr, begin+j, begin+j+5);
			exchange(arr, begin+i, begin+j+2);
		}

		deterministic_select(arr, begin, begin+i, i>>1);
		exchange(arr, begin, begin+(i>>1));
		let cut = partition(
			arr, begin+1, end, it => compare(arr, it, begin) <= 0);
		exchange(arr, begin, cut-1);

		const pivot_idx = cut-1-begin;
		if (pivot_idx < k) {
			k -= cut-begin;
			begin = cut;
		} else {
			end = cut;
		}
	}
}

function partition(arr, begin, end, predicate){
	if(begin == end) return;

	let l = begin;
	let r = end;

	while(l<r){
		while(l < r &&  predicate(l  )) l += 1;
		while(l < r && !predicate(r-1)) r -= 1;
		if(l < r) {
			exchange(arr, l, r-1);
			l += 1;
			r -= 1;
		}
	}

	return l;
}
