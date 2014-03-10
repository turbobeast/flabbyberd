var VECTOR = function (x,y) {

	this.x = x || 0;
	this.y = y || 0;

};

VECTOR.prototype = {

	constructor : VECTOR,


	set : function (x,y) {
		this.x = x;
		this.y = y;

		return this;
	},


	mag : function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},


	add : function (vec) {
		this.x += vec.x;
		this.y += vec.y;

		return this;
	},


	subtract : function (vec)  {
		this.x += -vec.x;
		this.y += -vec.y;

		return this;
	},


	unit : function () {
		var magnitood = this.mag();
		return new VECTOR(this.x / magnitood, this.y / magnitood);
	},


	angle : function (vec) {
		var adjacent = this.project(vec).mag(),
		hypoteneuse = this.mag();

		if(hypoteneuse === 0) {
			return 0;
		}

		return Math.acos( adjacent / hypoteneuse );

	},


	leftNormal : function () {
		return new VECTOR(this.y, -this.x);
	},


	rightNormal : function () {
		return new VECTOR(-this.y, this.x);
	},


	dot : function (vec) {
		return this.x * vec.x + this.y * vec.y;
	},

	project : function (vec) {
		var dotScalar = this.dot(vec) / vec.dot(vec);
		return new VECTOR(vec.x * dotScalar, vec.y * dotScalar);
	},


	perpendicular : function (vec) {
		var cloney = this.clone(),
		parallel = this.project(vec);

		return cloney.subtract(parallel);
	},


	multiply : function (scalar) {
		this.x *= scalar;
		this.y *= scalar;

		return this; 
	},


	setMagnitude : function (scalar) {
		var unitVec = this.unit();

		this.x = unitVec.x * scalar;
		this.y = unitVec.y * scalar;

		return this; 
	},

	max : function (limit) {
		var currentMag = this.mag();
		if(currentMag > limit) {
			this.setMagnitude(limit);
		}
	},


	clear : function () {
		this.x = 0;
		this.y = 0;
	},

	clone : function () {
		return new VECTOR(this.x, this.y);
	},

	render : function (startX, startY, ctx) {

		ctx.save();
		ctx.strokeStyle= 'rgb(255,0,0)';
		ctx.moveTo(startX, startY);
		ctx.lineTo(startX + this.x, startY + this.y);
		ctx.stroke();
		ctx.restore();
	}


};