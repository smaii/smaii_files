
/**
 * Created by Administrator on 2017/2/20.
 */

define(function(require,exports,module){

     module.exports = {
        entry : function(){

            this.drawImage();

        },
        drawImage: function(){
            //绘制背景
            var _bg = new Image();
            _bg.src = './src/images/bg1.jpg';
            _bg.onload = function(){
                _ctx1.drawImage(_bg, 0, 0,_can1.width,_can1.height);
            };
        }

    }


});




