const step = 1;
const delay = 0;

function lower (arr, from, to, val) {
	while (from < to) {
		const mid = (from + to) >> 1;
		if (compare(arr, mid, val) < 0)
			from = mid + 1;
		else
			to = mid;
	}
	return from; 
} 

function upper (arr, from, to, val) { 
	let len = to - from;
	let half; 
	while (len > 0) { 
		half = (len/2)|0; 
		let mid= from + half; 
		if (compare (arr, val, mid) < 0) 
			len = half; 
		else { 
			from = mid+1; 
			len = len - half -1; 
		} 
	} 
	return from; 
} 

function insert_sort (arr, from, to) { 
	if (to > from+1) { 
		for (let i = from+1; i < to; i++) { 
			for (let j = i; j > from; j--) { 
				if (compare(arr, j, j-1)<0) 
					exchange(arr, j, j-1); 
				else break; 
			} 
		} 
	} 
} 

function merge(arr, from, pivot, to, len1, len2) { 
	if (len1 == 0 || len2==0) return; 
	if (len1+len2 == 2) { 
		if (compare(arr, pivot, from) < 0) 
		 exchange(arr, pivot, from); 
		return; 
	} 
	let first_cut, second_cut; 
	let len11, len22; 
	if (len1 > len2) { 
		len11=(len1/2)|0; 
		first_cut = from + len11; 
		second_cut = lower(arr, pivot, to, first_cut); 
		len22 = second_cut - pivot; 
	} else { 
		len22 = (len2/2)|0; 
		second_cut = pivot + len22; 
		first_cut = upper(arr, from, pivot, second_cut); 
		len11=first_cut - from; 
	} 
	rotate(arr, first_cut, pivot, second_cut); 
	let new_mid=first_cut+len22; 
	merge(arr, from, first_cut, new_mid, len11, len22); 
	merge(arr, new_mid, second_cut, to, len1 - len11, len2 - len22); 
}
 
function sort(arr, from, to) {
	if (to - from < 3) { 
		insert_sort (arr, from, to); 
		return; 
	} 
	let middle = ((from + to)/2)|0; 
	sort (arr, from, middle); 
	sort (arr, middle, to); 
	merge(arr, from, middle, to, middle-from, to - middle); 
}

// ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ====

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
