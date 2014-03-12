var CAMERA = function (wid,hite,target) {
	this.offsetX = wid / 3;
	this.offsetY = hite / 2;
	this.x = -target.x + (wid / 3);
	this.y = 0;
	//this.y = -target.y + (hite / 2);
	this.target = target || null;
};


CAMERA.prototype = {
	setTarget : function (targ) {
		this.target = targ;
	},

	changeSize : function (wid,hite) {
		this.offsetX = wid /3;
		this.offsetY = hite /2;
	},

	update : function () {
		var xDelt =  (-this.target.x) + this.offsetX - this.x;
		var yDelt =  (-this.target.y) + this.offsetY - this.y;
		//cam.x = -cam.target.x + cam.offsetX;
		//cam.y = -cam.target.y + cam.offsetY;
		this.x += (xDelt) * 0.05;
		//this.y += (yDelt) * 0.05;
	}
};