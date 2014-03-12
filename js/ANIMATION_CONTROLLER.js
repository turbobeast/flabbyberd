var ANIMATION_CONTROLLER = (function () {
	var troller = {},
	scenes = [],
  paused = false,
	animFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  function(/* function */ callback/*,  DOMElement  element */){
                    window.setTimeout(callback, 1000 / 60);
                  };
    }());

    function looper () {
    	var i = 0;

    	for(i = 0; i < scenes.length; i+= 1) {
    		scenes[i].update();
    	}
      
    	for(i = 0; i < scenes.length; i+= 1) {
    		scenes[i].render();
    	}
      if(!paused) {
        animFrame(looper);
      }
    }

    troller.pause = function () {
      paused = true;
    };

    troller.resume = function () {
      paused = false;
      looper();
    };

    troller.togglePause = function () {
      if(paused) {
        troller.resume();
      } else {
        troller.pause();
      }
    };

    troller.addScene = function (seen) {
        if(typeof seen.update !== 'function' || typeof seen.render !== 'function') {
            return console.error('seens need an update and render function');
        }

    	scenes.push(seen);
    };

    troller.removeScene = function (seen) {
    	var i = scenes.length;
        for(i = scenes.length; i >= 0; i -= 1) {
            if(scenes[i] === seen) {
                scenes.splice(1,i);
            }
        }
     }; 

    troller.init = function () {
    	looper();
    };

	return troller;

}());