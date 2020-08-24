
// **** **** **** **** | **** **** **** **** | **** **** **** **** | **** **** **** **** //

function upper_bound(arr, begin, end, value_pos){
    let a = begin
    let b = end;

    // upper_bound
    while(a!=b){
        let m = (a+b) >> 1;

        if(compare(arr,m,value_pos) <= 0){
            a = m+1;
        }else{
            b = m;
        }
    }

    return a;
}

function insertion_sort(arr, begin, end) {
    for (let i = begin; i < end; ++i){
        let pos = upper_bound(arr,begin,i,i);
        for (let j = i; j > pos; --j)
                exchange(arr,j,j-1);
    }
}

function expand(arr, begin, end){
    let n = end-begin;
    console.log(n);
    for (let i = n; i--;){
        exchange(arr, begin+i, begin+i+i);
    }
}

function gapped_binary_search(arr, begin, end, value_pos){
    let n = (end - begin) >> 1;

	let l = 0;
	let r = n;
	while(l != r){
		let m = (l+r)>>1;
		if(compare(arr, value_pos, begin+m*2)<0)
			r = m;
		else
			l = m+1;
	}

	return begin+Math.max(0,2*l-1);
}

// Gapsort
function sort (arr, begin, end) {
    let n = end - begin;
    let sorted = Math.min(16, n);

    insertion_sort(arr, begin, begin+sorted);
	if(n == sorted) return;

	while(sorted != n){
		expand(arr, begin, begin+sorted);

		for(let i = 0; i < sorted; ++i){
			let j = begin + i*2+1;


			let prev_try = null;

			while(1){

				// already in the right place
				if (compare(arr, j-1, j) < 0 &&
					(j+1 == begin+2*sorted ||
						compare(arr, j, j+1, begin+2*sorted) < 0))
					break;

				let out = gapped_binary_search(
					arr, begin, begin+2*sorted, j);

				// if it is before, just insert backwards
				if (out < j) {
					// be careful with the element that's
					// already there
					if(compare(arr, j, out) > 0)
						out += 1;
					for (let k = j; k > out; --k)
						exchange(arr, k, k-1);
					break;
				}

				// if it is after, and there is no conflict,
				// just put it right where it wants to go
				if(prev_try === null || out !== prev_try){
					exchange(arr, j, out);
					prev_try = out;
					continue;
				}

				// if we know both elements want to be in
				// the same position, we need to scan
				// backwards for an element that's out of
				// place.
				let hole = out-2;
				while (j < hole &&
					(hole+1 == begin+2*sorted ||
						compare(arr, hole, hole+1) < 0) &&
					compare(arr, hole-1, hole) < 0)
					hole -= 2;

				exchange(arr, j, hole);

				let end = out;
				if(compare(arr,hole,out)<0)
					end -= 1;

				for(let i = hole; i < end; ++i)
					exchange(arr, i, i+1);

				// we might be able to do something better
				// with this, which could save us a few
				// comparisons in the next iteration.
				// It's kinda hard to reason about, so I'm
				// just letting it forget the last operation
				prev_try = null;
			}
		}

		sorted += sorted;
	}
}


function clamp(x,low,high){
	return Math.max(low,Math.min(high,x));
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


