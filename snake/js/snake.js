/**
 * Created by Administrator on 2017/2/22.
 */
//snake.js  绘制以及定义snake的行为:


define(function(require,exports,module){
    var joy = require('joy');
    var angle ;

    module.exports = {
        //
        snake :{
            speed : 1
        },
        entry: function(){
            var that = this;
            function loop(){
                window.fps(loop);
                that.drawSnake(1,1);
            }
            loop();
            console.log(this);
        },
        //画蛇
        drawSnake : function(stepX,stepY) {
            //设定默认值:
            stepX = stepX || 0;
            stepY = stepY || 0;
            angle = joy.direction()+Math.PI/2;
            //console.log(angle);
            //通过stepX和stepY控制snake的移动:
            // x+=stepX;
            // y+=stepY;
            //this.rotateSnake();
            this.getHead();
        },
        rotateSnake : function(){
            _ctx2.beginPath();
            _ctx2.rotate(angle);
            console.log('rotate');
        },
        getHead : function(){
            //创建蛇头,绘制
            var _head = new Image();
            _head.src = './src/images/head-30.png';
            //正则匹配head的尺寸,string.match方返回一个匹配结果的数组:
            var size = _head.src.match(/\d+/g)[0];
            //蛇的默认生成位置
            var x = _can2.width/2-size/2;
            var y = _can2.height/2-size/2;
            _head.onload = function () {
                _ctx2.save();
                //清除画布
                _ctx2.clearRect(0, 0, _can2.width, _can2.height);
                //中心旋转的关键,两次位移,位移距离为image的中心坐标(即画图时(moveTO的点,非画布)的左上角坐标+image的宽高)
                _ctx2.translate(_can2.width/2,_can2.height/2)
                _ctx2.rotate(angle);
                _ctx2.translate(-_can2.width/2,-_can2.height/2);
                //对画布两次旋转之后(旋转在中间),此时的坐标系满足绘图标准
                _ctx2.drawImage(_head,x,y);
                _ctx2.restore();
            };
        }




    }

});
