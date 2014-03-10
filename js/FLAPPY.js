var FLAPPY = function (x,y) {
	var bird = {
		width: 62,
		height: 44,
		x : x,
		y : y,
		angle : 0,
		accel : new VECTOR(0,0),
		velocity : new VECTOR(0,0)
	},
	sprite = new Image(),
	gravity = new VECTOR(0,0.2);

	sprite.src = 'images/flappy.png';

	bird.jump = function () {
		bird.accel.clear();
		bird.accel.add( new VECTOR(0,-24) );

	};

	bird.update = function () {

	
		bird.accel.add(gravity);
		bird.velocity.add(bird.accel);
		bird.velocity.max(6);

		bird.x += bird.velocity.x;
		bird.y += bird.velocity.y; 
		bird.angle = bird.velocity.y / 30;

		bird.accel.clear();
	};

	bird.render = function (ctx) {

		ctx.save();

		ctx.setTransform(1,0,0,1,0,0);
		ctx.translate(bird.x, bird.y);
		ctx.rotate(bird.angle);

		ctx.drawImage(sprite, -bird.width * 0.5, -bird.height * 0.5, bird.width, bird.height );

		ctx.restore();
	};

	return bird; 		
};