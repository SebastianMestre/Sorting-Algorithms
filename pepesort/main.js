const step = 1;
const delay = 0;

function reverse(arr, begin, end) {
	while(begin < end) {
		exchange(arr, begin++, --end);
	}
}

function gcd (m,n) {
	while(n != 0) {let t = m%n; m=n; n=t;}
	return m;
}

function rotate (arr, begin, mid, end) {
	if(begin==mid||end==mid) return begin+(end-mid);
	let n = gcd(end - begin, mid - begin); 
	while (n-- != 0) { 
		let val = item(arr, begin+n); 
		let shift = mid - begin; 
		let p1 = begin+n;
		let p2 = begin+n+shift; 
		while (p2 != begin + n) { 
			assign(arr, p1, item(arr, p2)); 
			p1=p2; 
			if ( end - p2 > shift) p2 += shift; 
			else p2 = begin + (shift - (end - p2)); 
		} 
		assign(arr, p1, val); 
	}
	return begin+(end-mid);
}

//function rotate(arr, begin, mid, end) {
//	reverse(arr, begin, mid);
//	reverse(arr, mid, end);
//	reverse(arr, begin, end);
//	return begin + (end - mid);
//}

function upper_bound(arr, begin, end, it) {
	while(begin != end) {
		let mid = begin + ((end - begin)>>1);
		if(!(compare(arr, it, mid)<0))
			begin = mid+1;
		else
			end = mid;
	}
	return begin;
}

function lower_bound (arr, begin, end, it) {
	while(begin != end) {
		let mid = (begin + ((end - begin)>>1))|0;
		if(compare(arr, mid, it)<0)
			begin = mid+1;
		else
			end = mid;
	}
	return begin;
}

function merge(arr, begin, pivot, end) {
    if (end-begin <= 1) return;
	if (end-begin == 2) {
		if (compare(arr, begin+1, begin)<0) {
			exchange(arr, begin+1, begin);
		}
		return;
	}
	
    if (compare(arr, pivot-1, pivot)<0) return;

	let m1;
	let m2;

	if (pivot-begin < end-pivot) {
		m2 = pivot + ((end-pivot)>>1);
		m1 = upper_bound(arr, begin, pivot, m2);
	} else {
    	m1 = begin + ((pivot - begin)>>1);
		m2 = lower_bound(arr, pivot, end, m1);
	}

    let r = rotate(arr, m1, pivot, m2);
  	
	merge(arr, begin, m1, r)
    merge(arr, r, m2, end);
}

function insertionsort(arr, begin, end) {
    if(begin == end) return;
    for(let it = begin+1; it != end; ++it) {
		let idx = upper_bound(arr, begin, it, it);
        for(let sub_it = it; sub_it != idx; --sub_it) {
				exchange(arr, sub_it, sub_it-1);
        }
    } 
}

function in_place_mergesort(arr, begin, end) {
	if (end - begin <= 12) {
		insertionsort(arr, begin, end);
		return;
	}
	
    let mid = begin+(((end-begin)/2)|0);

    in_place_mergesort(arr, begin, mid);
    in_place_mergesort(arr, mid, end);

    merge(arr, begin, mid, end);
}

function weirdsort (arr, begin, end) {
	
	let stride = 2;
	{
		let i;
		for(i = begin; i+stride <= end; i += stride) {
			insertionsort(arr, i, i+stride);
		}
		insertionsort(arr,i,end);
		merge(arr,i-stride,i,end);
	}

	while(stride <= ((end-begin)>>1)) {
		stride += stride;
		let i;
		for(i = begin; i+stride <= end; i += stride) {
			merge(arr, i, i+stride/2, i+stride);
		}
		merge(arr,i-stride, i, end);
	}
}

function main()
{
	const n = 256;

	let arr = make_array(n);
	shuffle(arr);

	init(arr);
	in_place_mergesort(arr, 0, n);
//	weirdsort(arr, 0, n);
	//insertionsort(arr, 0, n);
	init(arr);
	return 0;
}

window.addEventListener("load", ()=>{main()});


