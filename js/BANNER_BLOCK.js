var BANNER_BLOCK = function (x,y,w,h) {

	this.x = x || 0;
	this.y = y || 0;
	this.width = w ;
	this.height = h;
	this.image = new Image();
	this.image.src = 'images/bannersprite.jpg';
	this.halfWidth = this.width * 0.5;
	this.halfHeight = this.height * 0.5;
	this.fillStyle = 'rgb(161,223,149)';

	this.superClass = {};

	this.superClass.render = BLOCK.prototype.render;

	this.bannerOffset = 0;

};


BANNER_BLOCK.prototype = new BLOCK();

BANNER_BLOCK.prototype.render = function (ctx,camera) {
	//this.superClass.render.apply(this,arguments);


	ctx.save();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.translate(camera.x + this.x, camera.y +  this.y);
	//ctx.rotate(bird.angle);
	//ctx.drawImage(sprite, -bird.width * 0.5, -bird.height * 0.5, bird.width, bird.height );
	ctx.drawImage(this.image,this.bannerOffset, 0, this.width, this.height, -this.width * 0.5,-this.height* 0.5, this.width, this.height);
	ctx.restore();
};

BANNER_BLOCK.prototype.setBanner = function (bannerName) {
	
	switch (bannerName) {
		case "speed":
			this.bannerOffset = 0;
		break;
		case "mona":
			this.bannerOffset = 118;
		break;
		case "honey":
			this.bannerOffset = 236;
		break;
		case "winner":
			this.bannerOffset = 354;
		break;	
	}
};
