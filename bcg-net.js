var NUM_PARTIC = 300;
var RANGE = 100;
var min_speed = 3;
var max_speed = 10;

class Particle{
	pos   = {x: 0.0, y: 0.0};
	speed = {x: 0.0, y: 0.0};
	
	constructor(){
		this.pos.x = rand(min_speed, max_speed);
		this.pos.y = rand(min_speed, max_speed);
		this.speed.x = rand(min_speed, max_speed);
		this.speed.y = rand(min_speed, max_speed);
	}
	
	init(){
		this.pos.x = rand(min_speed, max_speed);
		this.pos.y = rand(min_speed, max_speed);
		this.speed.x = rand(min_speed, max_speed);
		this.speed.y = rand(min_speed, max_speed);
	}
	
	move(bgSize){
		this.pos.x += this.speed.x;
		this.pos.y += this.speed.y;
		
		if(this.pos.x < 0 || this.pos.x > bgSize.x || this.pos.y < 0 || this.pos.y > bgSize.y) this.init();
	}
};

function startBG() {
	var bcgElem = document.getElementsByClassName("main_grid_center_column")[0];

	var bcgSize = {x: bcgElem.clientWidth, y: bcgElem.clientHeight};
	console.log('Canvas size: ');
	console.log(bcgSize);

	var cvsElem = document.createElement("canvas");
	cvsElem.setAttribute("style", "position: absolute; left: 0; top: 0; width: 100%; height: 100%;");
	cvsElem.setAttribute("width", "" + bcgElem.x);
	cvsElem.setAttribute("height", "" + bcgElem.y);
	
	bcgElem.insertBefore(cvsElem, bcgElem.firstChild);

	var context = cvsElem.getContext("2d");

	var gradient = context.createLinearGradient(0, 0, bcgSize.x, bcgSize.y);
	
	gradient.addColorStop(0, "gray");
	gradient.addColorStop(0.3, "yellow");
	gradient.addColorStop(1, "red");

	var partics = [];
	for(let i = 0; i < NUM_PARTIC; i++) partics.push(new Particle());

	setInterval(() => {
		for(let i = 0; i < NUM_PARTIC; i++) partics[i].move(bcgSize);
		
		context.fillStyle = gradient;
		context.fillRect(0, 0, bcgSize.x, bcgSize.y);
		
		for(let i = 0; i < NUM_PARTIC; i++){
			for(let j = 0; j < NUM_PARTIC; j++){
				if(i == j) continue;
				let d = dist(partics[i].pos, partics[j].pos);
				if(d < RANGE) line(context, partics[i].pos, partics[j].pos, d * 2.55);
			}
		}
		
		console.log('tick');
	}, 100);
};

function line(ctx, pos1, pos2, alpha){
	ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
	ctx.beginPath();
	ctx.moveTo(pos1.x, pos1.y);
	ctx.lineTo(pos2.x, pos2.y);
	ctx.stroke();
}

function rand(min, max){
	return Math.random() * (max - min) + min;
}

function dist(l, r){
	let d1 = l.x - r.x;
	let d2 = l.y - r.y;
	return Math.sqrt(d1*d1 + d2*d2);
}