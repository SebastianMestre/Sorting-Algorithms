const step = 1;
const delay = 0;

function main() {
	const n = 5**3;

	let arr = make_array(n);
	shuffle(arr);

	init(arr);
	deterministic_select(arr, 0, n, n>>1);
	init(arr);

	playAnim();

	return 0;
}

window.addEventListener("load", ()=>{main()});


