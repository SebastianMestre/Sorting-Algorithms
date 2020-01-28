
let updates = [];
let animArr = [];
let markers = [];
let animIdx = 0;

let comparisons = 0;
let swaps = 0;

function drawNext() {
	for(let i = 0; i < step-1 && animIdx < updates.length-1; ++i, animIdx++) {
		applyUpdateAndDraw(false);
	}
	applyUpdateAndDraw(true);
	animIdx++;
}

function playAnim(){
	animIdx = 0;
	let v = window.setInterval(()=>{
		drawNext();
		if(animIdx >= updates.length)
			window.clearInterval(v);
	}, delay);
}

function drawArray(canvas, ctx, data, color, colorB){
	for ( let i = 0; i < data.length; ++i)
		drawRect(canvas, ctx, data, i, (i%2)?color:colorB);
}

function drawRect(canvas, ctx, data, idx, color){
	ctx.fillStyle = color;
	const w = canvas.width / data.length;
	let h = canvas.height * data[idx];
	let x = canvas.width * idx / data.length;
	let y = canvas.height - h;
	ctx.fillRect(x,y,w,h);
}

function applyUpdateAndDraw(doDraw) {
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");

	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);

	for ( let diff of updates[animIdx].diff ) {
		animArr[diff.idx] = diff.val;
	}
	
	if (updates[animIdx].marker){
		console.log(updates[animIdx].marker);
		markers = updates[animIdx].marker;
	}

	if(doDraw){
		drawArray(canvas, context, animArr, "white", "#ddd");

		for ( let special of updates[animIdx].special )
			drawRect(canvas, context, animArr, special.idx, special.color);

		for( let marker of markers )
			drawRect(canvas, context, animArr, marker.idx, marker.color);
	}


}

// **** **** **** **** | **** **** **** **** | **** **** **** **** | **** **** **** **** //

function init(arr){
	let init_diff = [...arr].map((x,i)=>({idx:i, val:x}));
	updates.push({
		diff:init_diff,
		special:[]
	});
}

function compare (arr, i,j) {
	comparisons++;
	updates.push({
		diff:[],
		special:[
			{idx:i, color:"blue"},
			{idx:j, color:"blue"}
		]
	});

	return arr[i] - arr[j];
}

function exchange (arr, i,j) {
    swaps++;
    
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;

	updates.push({
		diff:[
			{idx:i, val:arr[i]},
			{idx:j, val:arr[j]}
		],
		special:[
			{idx:i, color:"red"},
			{idx:j, color:"red"}
		]
	});

}

function assign(arr, i, x) {
	updates.push({
		diff:[
			{idx:i, val:x}
		],
		special:[
			{idx:i, color:"green"}
		]
	});

	arr[i] = x;
}

function item(arr, i){
	updates.push({
		diff:[],
		special:[
			{idx:i, color:"red"}
		]
	});

	return arr[i]; 
}

function noop(arr){
	updates.push({
		diff:[],
		special:[]
	});
}

function highlight(arr, ...is){
	updates.push({
		diff: [],
		special: [],
		marker: is.map(i => ({idx: i, color: "yellow"}))
	});
}

// **** **** **** **** | **** **** **** **** | **** **** **** **** | **** **** **** **** //

function make_array (n) {
    let arr = new Array(n);
	for (let i = 0; i < n; ++i) {
		arr[i] = (i+1)/n;
	}
	return arr;
}

function shuffle (arr) {
	const n = arr.length;
	for(let i = 0; i < n; ++i) {
		let r = (Math.random()*n)|0;
		let temp = arr[i];
		arr[i] = arr[r];
		arr[r] = temp;
    }
}
