function Blob(x, y, r, col, speed = 4) { 
	this.pos = createVector(x, y);
	this.r = r;
	this.vel = createVector(0, 0);
	this.interval;
	/*this.wobbleSpeed = 2;
	this.wobble = function() {
		this.pos.y += lerp(this.pos.y, this.wobbleSpeed, 1); // lerp(this.pos.y, this.wobbleSpeed, 0.9); Awesome observable universe (extending outwards infinitly)
		this.wobbleSpeed = -this.wobbleSpeed;
	}*/
 	
	this.split = function() {

	}
	
	this.eject = function() {
		let pos = createVector(mouseX - (this.pos.x + this.vel.x), mouseY - (this.pos.y + this.vel.y));
		// pos = lerp(pos, this.pos, 0.1);
		/*pos = pos.lerp(mouseX, -width/2, 0.001);
		pos = pos.lerp(mouseY, -height/2, 0.001);*/
		// let minPos = 0;
		this.r = addSurfaceArea(this.r, 0) - blob_smallest_size + 10;
		/*this.interval = setInterval(function() {
			if(minPos === pos) {
				clearInterval(this.interval);
			} else {
				minPos += 0.00001;
			}
		}, 10);*/
		
		let mass = new Blob(pos.x, pos.y, this.r, this.color);
		// mass.show();
		blobs.push(mass);
	}
	
	this.getColor = function() {
		var colours = ["ff0000", "4023ff", "00ff90", "ffeb3f", "ff96f4", "00ff37", "6e00ff", "00fffa", "ff5400", "ff00d0", "00ffae"];
		var randCol = floor(random(colours.length));
		return `#${colours[randCol]}`;
	}
	
	this.color = col || this.getColor();
	
	this.update = function() {
		let newvel = createVector(mouseX-width/2, mouseY-height/2);
		newvel.setMag(speed);
		this.vel.lerp(newvel, 0.2);
		this.pos.add(this.vel);
	}
	
	this.reachedBorders = function() {
		if(this.pos.x > width*2) {
			this.pos.x = lerp(this.pos.x, width*2, 0.1);
		}
		
		if(this.pos.y > height*2) {
			this.pos.y = lerp(this.pos.y, height*2, 0.1);
		}
		
		if(this.pos.x < -width) {
			this.pos.x = lerp(this.pos.x, -width, 0.1);
		}
		
		if(this.pos.y < -height) {
			this.pos.y = lerp(this.pos.y, -height, 0.1);
		}
	}
	
	this.eats = function(other) {
		if(!other) return;
		var d = p5.Vector.dist(this.pos, other.pos);
		if(d < this.r + other.r && this.r > other.r) {
			this.r = addSurfaceArea(this.r, other.r);
			return true;
		} else {
			return false;
		}
	}
	
	this.show = function() {
		
		fill(this.color);
		
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
		
	    // this.pos.y % 8;
		
	}
	
}

function Text(txt) {
	this.pos = createVector(0, 0);
	this.txt = txt;
	
	this.update = function() {
		if(!txt)
		this.txt = `SCORE: ${parseInt(blob.r)}`;
		textSize(blob.r / 4);
		this.pos = p5.Vector.add(createVector(-blob.r/1.5, 0), blob.pos); //.sub();
	}
	
	this.show = function() {
		fill(255);
		stroke(0);
		text(this.txt, this.pos.x, this.pos.y);
	}
}