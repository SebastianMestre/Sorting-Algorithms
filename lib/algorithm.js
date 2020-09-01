
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

function median_small (arr, begin, end) {
	insertion_sort(arr, begin, end);
	return (begin + end) >> 1;
}

function median_of_medians (arr, begin, end) {
	const n = end - begin;

	// if it's small, just return the actual median
	if (n <= 5)
		return median_small(arr, begin, end);

	let i = 0;
	for(let j = 0; j < n; j += 5, i += 1){
		const l = begin+j;
		const r = begin+Math.min(j+5,n);

		const median = median_small(arr, l, r);
		exchange(arr, begin+i, median);
	}
	deterministic_select(arr, begin, begin+i, i>>1);
	return begin + (i>>1);
}

function deterministic_select (arr, begin, end, k) {
	while (1){
		const n = end - begin;

		if (n <= 5) {
			insertion_sort(arr, begin, end);
			break;
		}

		const pivot = median_of_medians(arr, begin, end);
		exchange(arr, begin, pivot);

		let cut = partition(
			arr, begin+1, end, it => compare(arr, it, begin) <= 0);
		exchange(arr, begin, cut-1);

		const pivot_idx = (cut-1)-begin;
		if (pivot_idx == k) {
			break;
		} else if (pivot_idx < k) {
			k -= (cut-begin);
			begin = cut;
		} else {
			end = cut-1;
		}
	}
	return begin + k;
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
