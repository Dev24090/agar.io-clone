var blob;
var split_blobs = [];

var blobs = [];
var zoom = 1;
const blobs_in_canvas = 200;
var score;
const blob_initial_size = 64;
const blob_smallest_size = 32;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight); 
	blob = new Blob(0, 0, blob_initial_size);
	for(var i = 0; i < blobs_in_canvas; ++i) {
		var x = random(-width, width*2);
		var y = random(-height, height*2);
		blobs[i] = new Blob(x, y, floor(random(15, 18))); 
	}
	setInterval(function() {
		if(blob.r-1>blob_initial_size) blob.r -= lerp(blob.r, floor(blob.r/132), 0.99) / 100;
	}, 10);
	score = new Text();
	
	/*setInterval(function() {
		blobs.forEach(function(cur) {
			cur.wobble();
		});
	}, 10);*/
}

function keyPressed() {
	if(keyCode === 32 && blob.pieces < 8) {
		blob.split();
	} else if(keyCode === 87 && blob.r-blob_smallest_size >= 32) {
		blob.eject();
	}
}
	
function addSurfaceArea(r1, r2) {
	let sum = (PI * r1 * r1) + (PI * r2 * r2);
	return sqrt(sum / PI);
}

function zoomOut(z, cur = blob_initial_size) {
	var newzoom = z / cur.r;
	zoom = lerp(zoom, newzoom, 0.1);
	scale(zoom);
	translate(-blob.pos.x, -blob.pos.y);
}

function draw() {
	background(0);
	
	translate(width/2, height/2);
	zoomOut(blob_initial_size);
	for(var i = blobs.length-1; i >= 0; --i) {
		blobs[i].show();
		if(blob.eats(blobs[i])) {
			blobs.splice(i, 1);
			var x = random(-width, width*2);
			var y = random(-height, height*2);
			blobs.unshift(new Blob(x, y, floor(random(15, 18))));
		}
	}
	
	blob.reachedBorders();
	blob.update();
	blob.show();
	score.update();
	score.show();
	
}