var PATTERN_BLOCK = function (x,y,w,h) {

	this.x = x || 0;
	this.y = y || 0;
	this.width = w ;
	this.height = h;
	this.image = null;
	this.patternCanvas = null;
	this.patternContext = null;
	this.patternWidth = 0;
	this.patternHeight = 0;
	this.patternOffsetX = 0;
	this.halfWidth = this.width * 0.5;
	this.halfHeight = this.height * 0.5;
	this.superClass = {};

	this.superClass.render = BLOCK.prototype.render;

};

PATTERN_BLOCK.prototype = new BLOCK();

PATTERN_BLOCK.prototype.render = function (ctx, camera) {
	//this.superClass.render.call(this,ctx, camera);

	if(this.patternOffsetX > ((this.patternWidth * 0.5) -1)) {
		this.patternOffsetX = 0;
	}

	this.patternContext.clearRect(0,0,this.patternWidth,this.patternHeight);

	this.patternContext.save();
	this.patternContext.translate(-this.patternOffsetX + (this.patternWidth * 0.5),0);
	this.patternContext.drawImage(this.image, 0, 0, this.patternWidth, this.patternHeight);
	this.patternContext.restore();

	this.patternContext.save();
	this.patternContext.translate(-this.patternOffsetX,0);
	this.patternContext.drawImage(this.image, 0, 0, this.patternWidth, this.patternHeight);
	this.patternContext.restore();

	var pats = ctx.createPattern(this.patternCanvas, "repeat");

	ctx.save();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.translate(camera.x +  (this.x - this.halfWidth), this.y - this.halfHeight);
	ctx.fillStyle = pats;
	ctx.beginPath();
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();

};

PATTERN_BLOCK.prototype.conveyor = function (speeds) {
	this.patternOffsetX += speeds;
};

PATTERN_BLOCK.prototype.setPattern = function (src,w,h) {

	this.image = new Image();
	this.image.src = src;
	this.patternCanvas = document.createElement('canvas');
	this.patternWidth = w;
	this.patternHeight = h;
	this.patternCanvas.width = w;
	this.patternCanvas.height = h;
	this.patternContext = this.patternCanvas.getContext('2d');

};


//PATTERN_BLOCK.prototype = new BLOCK();
