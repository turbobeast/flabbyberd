var PIPE = function (centerY, hite, wid, camera) {

	var pipe = {
		x : wid + 200 - camera.x,
		blocks : [],
		speed : 4,
		width: 118,
		height: 444
	},
	banners = ["honey","mona","winner","speed"],
	passed = false,
	height = hite,
	gapHeight = 260,
	bottomPipeTop = centerY + (gapHeight * 0.5),
	topPipeBottom = centerY - (gapHeight * 0.5),
	bottomPipeY = bottomPipeTop + (pipe.height * 0.5),
	topPipeY = topPipeBottom - (pipe.height * 0.5);

	console.log(camera);
	//bottomPipeY = bottomPipeTop + ((height -  bottomPipeTop) * 0.5),
	//topPipeY = (topPipeBottom) * 0.5,
	//topPipeHeight = topPipeY * 2,
	//bottomPipeHeight = (height - bottomPipeY) * 2;


	pipe.blocks.push( new BANNER_BLOCK(pipe.x, bottomPipeY, pipe.width, pipe.height) );
	pipe.blocks.push( new BANNER_BLOCK(pipe.x, topPipeY, pipe.width, pipe.height) );

	var randomBanner = banners[Math.floor(Math.random() * banners.length)];


	for(i = 0; i < pipe.blocks.length; i += 1) {
		var randomBanner = banners[Math.floor(Math.random() * banners.length)];
		pipe.blocks[i].setBanner(randomBanner);
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