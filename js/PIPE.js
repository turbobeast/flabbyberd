var PIPE = function (centerY, hite, wid, floor) {

	var pipe = {
		x : wid + 200,
		blocks : [],
		speed : 4,
		width: 100
	},
	passed = false,
	height = hite,
	gapHeight = 200,
	bottomPipeTop = centerY + (gapHeight * 0.5),
	topPipeBottom = centerY - (gapHeight * 0.5),
	bottomPipeY = bottomPipeTop + ((height -  bottomPipeTop) * 0.5),
	topPipeY = (topPipeBottom) * 0.5,
	topPipeHeight = topPipeY * 2,
	bottomPipeHeight = (height - bottomPipeY) * 2;


	pipe.blocks.push( new BLOCK(pipe.x, bottomPipeY, 100, bottomPipeHeight) );
	pipe.blocks.push( new BLOCK(pipe.x, topPipeY, 100, topPipeHeight) );

	var i = 0;

	for(i = 0; i < pipe.blocks.length; i += 1) {
		pipe.blocks[i].setColor('rgb(255,23,23)');
			
	}


	pipe.update = function () {
		this.x -= this.speed;
		var i = 0;
		for(i = 0; i < this.blocks.length; i += 1) {
			this.blocks[i].x = this.x;
		}
	};


	pipe.render = function (ctx,camera) {
		var i = 0;
		for(i = 0; i < this.blocks.length; i += 1) {
			this.blocks[i].render(ctx,camera);
		}
	};

	return pipe;

};