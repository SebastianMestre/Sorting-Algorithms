
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
