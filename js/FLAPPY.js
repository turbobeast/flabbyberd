var FLAPPY = function (x,y) {
	var bird = {
		width: 62,
		height: 44,
		x : x,
		y : y,
		startY : y,
		angle : 0,
		accel : new VECTOR(0,0),
		velocity : new VECTOR(0,0)
	},
	floatCounter = 0,
	floatRange = 40,
	dead = false,
	sprite = new Image(),
	gravity = new VECTOR(0,0.4);

	sprite.src = 'images/flappy.png';

	bird.jump = function () {
		bird.accel.clear();
		bird.accel.add( new VECTOR(0,-34) );

	};



	bird.float = function () {
		floatCounter += 0.04;

		bird.y = bird.startY + Math.sin(floatCounter) * floatRange; 
	};

	bird.update = function () {
		
		bird.accel.add(gravity);
		bird.velocity.add(bird.accel);
		bird.velocity.max(9);


		if(!dead) {	
			bird.angle = bird.velocity.y / 10;
		} else {
			bird.angle = Math.PI / 2;
		}

		bird.y += bird.velocity.y; 

		bird.accel.clear();

		
	};

	bird.die = function () {
		dead = true;
	};

	bird.render = function (ctx, camera) {
		ctx.save();
		ctx.setTransform(1,0,0,1,0,0);
		ctx.translate(camera.x + bird.x, camera.y +  bird.y);
		ctx.rotate(bird.angle);
		ctx.drawImage(sprite, -bird.width * 0.5, -bird.height * 0.5, bird.width, bird.height );
		ctx.restore();
	};

	return bird; 		
};