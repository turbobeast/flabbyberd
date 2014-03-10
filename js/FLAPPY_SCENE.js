var FLAPPY_SCENE = function (wid,hite,ctx) {

	var scene = {},
	width = wid,
	height = hite,
	ctx = ctx,
	pipeSpeed = 4,
	collision = false,
	bird = FLAPPY(wid/2, hite/5),
	ground = new BLOCK(wid/2, hite * 0.99, wid, 100),
	pipes = [];

	scene.update = function () {
		bird.update();
		ground.update();

		for(var i = pipes.length-1; i >= 0; i-= 1) {
			var pip = pipes[i];
			pip.update();

			if(pip.x < -(pip.width * 0.5)) {
				pipes.splice(i,1);
			}
		}

		for(var i = 0; i < pipes.length; i += 1) {
			for(var c = 0; c < pipes[i].blocks.length; c += 1) {
				var block = pipes[i].blocks[c];
				if(block.collisionTest(bird)) {
					console.log('hit');
				}
			}
		}

		ground.collisionTest(bird);
	};

	scene.updateSize = function (wid,hite) {
		width = wid;
		height = hite;
	};

	scene.render = function () {
		ctx.fillStyle = 'rgb(197,250,255)';
		ctx.fillRect(0,0,width, height);
		
		ground.render(ctx);

		for(var i = 0; i < pipes.length; i += 1) {
			pipes[i].render(ctx);
		}
		bird.render(ctx);

	};

	scene.onTouch = function () {
		bird.jump();
	};

	function addPipe () {

		var rise = Math.round( Math.random() * 200);
		var pipe = PIPE((height * 0.5) -rise, height, width );
		pipes.push(pipe);

		setTimeout(addPipe, Math.random()* 1200 + 1200);
	}

	setTimeout(addPipe, 200);

	return scene;
};