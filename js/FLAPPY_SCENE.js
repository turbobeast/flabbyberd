var FLAPPY_SCENE = function (wid,hite,ctx) {

	var scene = {},
	width = wid,
	height = hite,
	ctx = ctx,
	score = 0,
	GAME_STATE = "PREGAME",
	pipeSpeed = 4,
	framesForPipe = 80,
	frameCounter = 0,
	collision = false,
	bird = FLAPPY(wid/2, hite/4),
	ground = new BLOCK(wid/2, hite * 0.9, wid  * 2, 33),
	camera = new CAMERA(wid,hite,bird),
	scoreListeners = [],
	pipes = [];

	function goal () {
		score ++;
		var i = 0;
		for(i = 0; i < scoreListeners.length; i +=1 ) {
			scoreListeners[i](score);
		}
	}

	function preGameShow () {
		bird.float();
		camera.update();
	}

	function liveUpdate () {
		bird.update();

		for(var i = 0; i < pipes.length; i += 1) {

			var pip = pipes[i];
			pip.update();

			if(pip.x < -(pip.width * 0.5)) {
				pipes.splice(i,1);
			}

			if(!pip.passed) {
				if(pip.x < (bird.x - (pip.width * 0.5)) ) {
					pip.passed = true;
					goal();
				}

			}

			for(var c = 0; c < pip.blocks.length; c += 1) {
				var block = pip.blocks[c];
				if(block.collisionTest(bird)) {
					bird.die();
					GAME_STATE = "DEADBIRD";
				}
			}
		}

		ground.followBird(bird);

		if(ground.collisionTest(bird)) {
			bird.jump();
			bird.die();
			GAME_STATE = "DEADBIRD";
		}

		camera.update();
		frameCounter++;

		if(frameCounter % framesForPipe === 0) {
			addPipe();
		}
	};

	function deadUpdate () {
		bird.angle = Math.PI / 2;
		bird.update();
		camera.update();
		ground.collisionTest(bird);

		// for(var i = 0; i < pipes.length; i += 1) {
		// 	var pip = pipes[i];
		// 	for(var c = 0; c < pip.blocks.length; c += 1) {
		// 		var block = pip.blocks[c];
		// 		block.collisionTest(bird);
		// 	}
		// }
		
	}

	scene.update = function () {

		switch(GAME_STATE) {
			case "PREGAME":
				preGameShow();
			break;
			case "LIVEBIRD":
				liveUpdate();
			break; 
			case "DEADBIRD":
				deadUpdate();
			break;
			default:
				liveUpdate();
			break;
		}
	};

	scene.updateSize = function (wid,hite) {
		width = wid;
		height = hite;

		ground.updateSize(wid/2, hite * 0.9, wid * 2, 33);
		camera.changeSize(wid,hite);
	};

	scene.render = function () {
		ctx.fillStyle = 'rgb(75,177,190)';
		ctx.fillRect(0,0,width, height);
		
		

		for(var i = 0; i < pipes.length; i += 1) {
			pipes[i].render(ctx,camera);
		}
		ctx.fillStyle = 'rgb(255,249,182)';
		ctx.fillRect(0,height*0.9,width, height*0.1);
		ground.render(ctx,camera);
		bird.render(ctx,camera);

	};
 
	scene.onScoreChange = function (funk) {
		if(typeof funk === 'function') {
			scoreListeners.push(funk);
		}
	};

	scene.onTouch = function () {
		if(GAME_STATE === "PREGAME") {
			GAME_STATE = "LIVEBIRD";
		}
		if(GAME_STATE === "LIVEBIRD") {
			bird.jump();
		}
	};

	function addPipe () {
		var rise = Math.round( Math.random() * 200);
		var pipe = PIPE((height * 0.5) -rise, height, width );
		pipes.push(pipe);
	}
	

	return scene;
};