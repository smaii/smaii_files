/**
 * Created by Administrator on 2017/2/20.
 */

define(function(require,exports,module){

   require('init')();// init();
   var bg = require('bg');
    bg.entry();
   //摇杆模块
   var joy =require('joy');
   joy.joyStick('joyDiv',null);

   //food
	var food = require('food');
	food.init();
	food.dead();
	// food.wave().init();
	// food.wave().born();
	food.draw();


	//snake 模块
    var snake = require('snake');
    //fruit  绘制果实

	//var fruit = require('fruit');
	 //fruit.init();


    // 主循环 帧率刷新
	function loop(){
		window.fps(loop);

		snake.entry();
		//fruit.draw();
		food.draw();
		//food.wave().draw();

	}

	loop();


});

