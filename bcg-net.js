var NUM_PARTIC = 300;
var RANGE = 120;
var PADDING = RANGE / 5;
var FPS = 100;
var min_speed = 0.01;
var max_speed = 1.00;

class Particle{
	pos   = {x: 0.0, y: 0.0};
	speed = {x: 0.0, y: 0.0};
	
	constructor(sz){
		this.pos.x = rand(0, sz.x);
		this.pos.y = rand(0, sz.y);
		this.speed.x = rand(min_speed, max_speed);
		this.speed.y = rand(min_speed, max_speed);
	}
	
	init(sz){
		this.pos.x = rand(0, sz.x);
		this.pos.y = rand(0, sz.y);
		this.speed.x = rand(min_speed, max_speed);
		this.speed.y = rand(min_speed, max_speed);
	}
	
	move(sz, c){
		this.pos.x += this.speed.x * func(c);
		this.pos.y += this.speed.y * func(c);

		if(this.pos.x < -PADDING || this.pos.x > sz.x + PADDING || this.pos.y < -PADDING || this.pos.y > sz.y + PADDING) this.init(sz);
	}
};

var bcgSize = {x: 0, y: 0};
var cvsElem;

function onResizeBG() {
	let bcgElem = document.getElementsByClassName("main_grid_center_column")[0];

	bcgSize = {x: bcgElem.clientWidth, y: bcgElem.clientHeight};
	
	cvsElem.width = bcgSize.x.toString();
	cvsElem.height = bcgSize.y.toString();
}

async function startBG() {
	let bcgElem = document.getElementsByClassName("main_grid_center_column")[0];

	let bcgSize = {x: bcgElem.clientWidth, y: bcgElem.clientHeight};

	cvsElem = document.createElement("canvas");
	cvsElem.setAttribute("style", "position: absolute; left: 0; top: 0;");
	cvsElem.setAttribute("width", bcgSize.x.toString());
	cvsElem.setAttribute("height", bcgSize.y.toString());
	
	bcgElem.insertBefore(cvsElem, bcgElem.firstChild);

	let context = cvsElem.getContext("2d");

	let gradient = context.createLinearGradient(0, 0, bcgSize.x, bcgSize.y * 0.8);
	/*
	gradient.addColorStop(0, "gray");
	gradient.addColorStop(0.3, "yellow");
	gradient.addColorStop(1, "red");
	*/
	
	gradient.addColorStop(0, "#6BD7FF");
	gradient.addColorStop(0.6, "#93FFA2");
	gradient.addColorStop(1, "#8DFF42");
	
	let partics = [];
	for(let i = 0; i < NUM_PARTIC; i++) partics.push(new Particle(bcgSize));

	let c = 0;
	setInterval(() => {
		for(let i = 0; i < NUM_PARTIC; i++) partics[i].move(bcgSize, c);
		
		context.fillStyle = gradient;
		context.fillRect(0, 0, bcgSize.x, bcgSize.y);
		
		for(let i = 0; i < NUM_PARTIC; i++){
			for(let j = 0; j < NUM_PARTIC; j++){
				if(i == j) continue;
				let d = dist(partics[i].pos, partics[j].pos);
				if(d < RANGE) line(context, partics[i].pos, partics[j].pos, (RANGE - d) / RANGE);
			}
		}
		c++;
	}, 1000 / FPS);
};

function func(c){
	return 1;
}

function line(ctx, pos1, pos2, alpha){
	//ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')';
	ctx.strokeStyle = 'rgba(0, 0, 0, ' + alpha + ')';
	ctx.beginPath();
	ctx.moveTo(pos1.x, pos1.y);
	ctx.lineTo(pos2.x, pos2.y);
	ctx.stroke();
}

function rand(min, max){
	let res = Math.random() * (max - min) + min;
	if(Math.random() > 0.5) res *= -1;
	return res;
}

function dist(l, r){
	let d1 = l.x - r.x;
	let d2 = l.y - r.y;
	return Math.sqrt(d1*d1 + d2*d2);
}