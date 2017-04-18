
/**
 * Created by Administrator on 2017/2/20.
 */

define(function(require,exports,module){
    //全局变量
    // var _can1,_can2;
    // var _ctx1,_ctx2;
    module.exports = function(){
        //_can1为背景,_can2为前景,用于绘画蛇,实物...
        //window.XXX  将变量暴露到全局
        window._can1 = document.getElementById('can1');
        window._can2 = document.getElementById('can2');
        window._can3 = document.getElementById('can3');
        // //初始化主容器大小:
        // var _main = document.getElementById('main');
        // _main.width = document.body.clientWidth;
        // _main.height = document.body.clientHeight;
        // console.log(_main.height);
        //初始化画布大小为窗口的宽高,如果满屏显示,可以由css-width=100%,height=100%设置
        _can1.width = document.body.clientWidth;
        _can1.height = document.body.clientHeight;
        _can2.width = document.body.clientWidth;
        _can2.height = document.body.clientHeight;
	    _can3.width = document.body.clientWidth;
	    _can3.height = document.body.clientHeight;

        //获得上下文环境
        window._ctx1 = _can1.getContext("2d");
        window._ctx2 = _can2.getContext("2d");
        window._ctx3 = _can3.getContext("2d");
        // console.log('全局变量加载成功!!!');

        }
        //window.requestAnimationFrame，这个方法在绘制的过程中有一个平滑的过渡，
        // 性能比setTimeout和setInterval要好
        window.fps = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                return window.setTimeout(callback, 1000 / 60);
            };
         })();


});

