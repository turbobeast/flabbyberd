var BLOCK = function (x,y,w,h) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = w;
	this.height = h;
	this.image = null;
	this.halfWidth = this.width * 0.5;
	this.halfHeight = this.height * 0.5;
	this.fillStyle = 'rgb(161,223,149)';
};

BLOCK.prototype = {
	updateSize : function (wid, hite) {
		
	},

	skin : function (src) {
		this.image = new Image();
		this.image.src = src;
	},

	setColor : function (fStyle) {
		this.fillStyle = fStyle;
	},

	update : function () {

	},


	collisionTest : function (ragdoll) {

		var hit = false;
		var maxDistX = ragdoll.width * 0.5 + this.width * 0.5;
		var maxDistY = ragdoll.height * 0.5 + this.height * 0.5;

		var distX = Math.abs(this.x - ragdoll.x);
		var distY = Math.abs(this.y - ragdoll.y);

		if(distX < maxDistX) {

			if(distY < maxDistY) {

				//collision!
				hit = true;
				var overlapX = maxDistX - distX;
				var overlapY = maxDistY - distY;
						
				var rawDistX = (this.x - ragdoll.x);
				var rawDistY = (this.y - ragdoll.y);

				if(overlapY < overlapX) {

					if(rawDistY < 0) {
						ragdoll.y += overlapY;
					} else {
						ragdoll.y -= overlapY;
					}
					ragdoll.velocity.multiply(-0.3);

				} else {

					if(rawDistX < 0) {
						ragdoll.x += overlapX;
					} else {
						ragdoll.x -= overlapX;
					}
				}

				ragdoll.angle = 0;
			}
		}

		return hit;
	},

	render : function (ctx) {


		ctx.save();
		ctx.fillStyle = this.fillStyle;
		ctx.setTransform(1,0,0,1,0,0);
		ctx.translate(this.x, this.y);
		ctx.fillRect(-this.halfWidth, -this.halfHeight, this.width, this.height);
		//ctx.drawImage(sprite, -this.width * 0.5, -this.height * 0.5, this.width, this.height );
		ctx.restore();

	}
};