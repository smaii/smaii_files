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
   //snake 模块
    var snake = require('snake');
    snake.entry();



});

