var FLAPPY_SCENE = function (wid,hite,ctx) {
	'use strict';

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
	bird = FLAPPY(wid/2, hite/2.4),
	ground = new PATTERN_BLOCK(wid/2, hite * 0.8, wid  * 2, 33),
	camera = new CAMERA(wid,hite,bird),
	scoreListeners = [],
	gameStartHandlers = [],
	deadBirdHandlers = [],
	pipes = [];

	ground.setPattern('images/groundtile.gif',48, 33);

	function updateScore () {
		var i = 0;
		for(i = 0; i < scoreListeners.length; i +=1 ) {
			scoreListeners[i](score);
		}
	}
	

	function goal () {
		score ++;
		updateScore();
	}

	function birdFuneral () {
		bird.jump();
		bird.die();
		GAME_STATE = "DEADBIRD";

		var i = 0;
		for(i = 0; i < deadBirdHandlers.length; i+= 1) {
			deadBirdHandlers[i]();
		}
	}

	function handleLevelStart () {
		var i = 0;
		for(i = 0; i < gameStartHandlers.length; i += 1) {
			gameStartHandlers[i]();
		}
	};

	function preGameShow () {
		bird.float();
		camera.update();
	}

	function readySet () {
		bird.float();
		camera.update();
	}

	function liveUpdate () {
		bird.update();

		for(var i = 0; i < pipes.length; i += 1) {

			var pip = pipes[i];

			if(!pip.passed) {
				if(pip.x < (bird.x - (pip.width * 0.5)) ) {
					pip.passed = true;
					goal();
				}
			}

			if(pip.x < -((pip.width * 0.5) -camera.x) ) {
				pipes.splice(i,1);
			}

			for(var c = 0; c < pip.blocks.length; c += 1) {
				var block = pip.blocks[c];
				if(block.collisionTest(bird)) {
					birdFuneral();
				}
			}

			pip.update();
		}

		if(ground.collisionTest(bird)) {
			birdFuneral();
		}


		if(bird.y < (bird.height* 0.5)) {
			bird.y = bird.height * 0.5;
		}

		camera.update();
		frameCounter++;
		ground.conveyor(4);


		if(frameCounter % framesForPipe === 0) {
			addPipe();
		}
	};

	function deadUpdate () {
		bird.update();
		camera.update();
		ground.collisionTest(bird);
	}

	scene.getReady = function () {
		GAME_STATE = "READY";
	};

	scene.update = function () {

		switch(GAME_STATE) {
			case "PREGAME":
				preGameShow();
			break;
			case "READY":
				readySet();
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

		ground.updateSize(wid/2 - (camera.x * 1.5), hite * 0.8, wid * 2, 33);
		camera.changeSize(wid,hite);

		scene.render();
	};

	scene.render = function () {

		ctx.clearRect(0,0,width,height);

		for(var i = 0; i < pipes.length; i += 1) {
			pipes[i].render(ctx,camera);
		}

		ctx.fillStyle = 'rgb(255,249,182)';
		ctx.fillRect(0,height*0.8,width, height*0.2);
	
		ground.render(ctx,camera);
		if(GAME_STATE !== "PREGAME") {
		//	bird.render(ctx,camera);
		}
		bird.render(ctx,camera);

	};
 
	scene.onScoreChange = function (funk) {
		if(typeof funk === 'function') {
			scoreListeners.push(funk);
		}
	};

	scene.onTouch = function () {

		if(GAME_STATE === "READY") {
			GAME_STATE = "LIVEBIRD";
			handleLevelStart();
		}

		if(GAME_STATE === "LIVEBIRD") {
			bird.jump();
		}
	};

	scene.inCaseOfDeadBird = function (funk) {
		if(typeof funk === 'function') {
			deadBirdHandlers.push(funk);
		}
	};

	scene.onLevelStart = function (funk) {
		if(typeof funk === 'function') {
			gameStartHandlers.push(funk);
		}
	};

	scene.reset = function () {

		bird = FLAPPY(wid/2, hite/2.4);
		score = 0;
		updateScore();
		pipes = [];
		GAME_STATE = "PREGAME";
	};

	function addPipe () {
		var rise = Math.round( Math.random() * 200);
		var pipe = PIPE((height * 0.5) -rise, height, width, camera );
		pipes.push(pipe);
	}
	

	return scene;
};