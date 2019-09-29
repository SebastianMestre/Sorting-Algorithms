
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

    let a = 0;
    let b = n;

    // upper_bound
    while(a!=b){
        let m = (a+b) >> 1;

        if(compare(arr,begin+m*2,value_pos) <= 0){
            a = m+1;
        }else{
            b = m;
        }
    }

    return begin + a * 2 - 1;
}

// Gapsort
function sort (arr, begin, end) {
    let n = end - begin;
    let sorted = Math.min(16, n);

    insertion_sort(arr, begin, begin+sorted);
	if(n == sorted) return;

    while(sorted + sorted <= n){
        expand(arr, begin, begin+sorted);
        sorted += sorted;

        let it = begin+1;
        let last = -1;
		let oklo = -1;
		let okhi = -1;
		highlight(arr, oklo, okhi);

		while(it < begin+sorted){

			if(oklo < it && it < okhi){
				console.log("skipped about", okhi - it, "spots");
				it = okhi-1;
				oklo = okhi = -1;
				highlight(arr, oklo, okhi);
			}

			let pos = null;
			if((compare(arr,it,it-1)<0)){ // should be behind its current position
				pos = Math.max(0, gapped_binary_search(arr, begin, it-1, it));

			}else if(it != end-1 && compare(arr,it,it+1)>=0){ // should be beyond its current position
				pos = gapped_binary_search(arr, it+1, begin+sorted, it);

			}else{
				last = it;
				it += 2;
				continue;
			}

			//let pos = Math.max(0, gapped_binary_search(arr, begin, begin+sorted, it));
			
			if(pos != last){
				exchange(arr, it, pos);
				last = pos;
				continue;
			}

			if(it < pos){

				if(compare(arr,it,pos)>0)
					exchange(arr,it,pos)

				let i = pos-1;
				for(; i > it; i -= 2)
					if(oklo <= i&&i < okhi){
						console.log("saved about", i-oklo, "comparisons");
						i = oklo;
					} else
						if(compare(arr, i-1, i)>0 || compare(arr,i-2,i-1)>0)
							break;

				if(oklo < pos && pos < okhi){
					oklo = i+1;
					highlight(arr, oklo, okhi);
				} else if (oklo < i && i < okhi && okhi < pos) {
					okhi = pos;
					highlight(arr, oklo, okhi);
				} else if(pos - (i+1) >= okhi - oklo){
					oklo = i+1;
					okhi = pos;
					highlight(arr, oklo, okhi);
				}

				exchange(arr, i-1, it);

				for(let j = i-1; j < pos-1; ++j)
					exchange(arr, j, j+1);

			} else {

				if(compare(arr, it, pos)<0)
					exchange(arr, it, pos);

				let i = pos+1;
				for(; i < it-1; i += 2);

				exchange(arr, i+1, it);

				for(let j = i+1; j > pos+1; --j)
					exchange(arr, j, j-1);
			}

		}
    }


	sort(arr, begin+sorted, end);
}


function clamp(x,low,high){
	return Math.max(low,Math.min(high,x));
}

function main()
{
	const n = 256;
    const inv = n;
    let arr = new Array(n);

	for (let i = 0; i < n; ++i) {
		arr[i] = (i+1)/n;
	}


	for(let i = 0; i < inv; ++i) {
		let a = (Math.random()*n)|0;
		let b = (Math.random()*n)|0;
		
        //a = (i*n/inv)|0;
        a = i;
		let r = (Math.random()*50)|0;
//		b = clamp((a+r-25), 0, n-1);
		
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
    }
	
	init(arr);
    sort(arr, 0, n);
	init(arr);

	playAnim();

	return 0;
}

window.addEventListener("load", ()=>{main()});


