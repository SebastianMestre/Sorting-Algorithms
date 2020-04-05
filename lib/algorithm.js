
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
	if (from==mid || mid==to) return; 
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
}
