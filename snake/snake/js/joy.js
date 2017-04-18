
/**
 * Created by Administrator on 2017/2/21.
 */

//joy.js   虚拟摇杆
define(function(require,exports,module){

		//出口 joyStick
        exports.joyStick = function(container, parameters) {

            //获得摇杆容器,并在内部创建画布:
            var objContainer = document.getElementById(container);
            var canvas = document.createElement('canvas');
            objContainer.appendChild(canvas);
            var context=canvas.getContext('2d');

            //设置画布的默认属性
            parameters = parameters || {
            		id:'joystick',
					width: objContainer.clientWidth,
                    height: objContainer.clientHeight,
                    innerFillColor: '#000',
                    innerLineWidth: '1',
                    innerStrokeColor: '#030',
                    outerFillColor: '#555',
                    outerLineWidth: '1',
                    outerStrokeColor: '#060',
					globalAlpha :'0.2'
                };

            canvas.id =  parameters.id;
            canvas.width = parameters.width;
            canvas.height = parameters.height;
			//记录touch状态:
            var pressed = 0;
			//画整圆,360度
            var cir = 2 * Math.PI;
            //外圆半径
            var outerRadius = canvas.width/2-20;
            //内圆半径
            var innerRadius = outerRadius/2;
            //内圆可以到达的距离
            var maxMoveStick = innerRadius + 1;
            //获取画布中心点
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            //内圆圆心的初始(默认)位置,画布中心
            var movedX=centerX;
            var movedY=centerY;
            //获取画布中心点相对于页面的绝对位置:
			var canvasX = objContainer.offsetLeft;
			var canvasY = objContainer.offsetTop;
			var positionX =centerX+canvasX;
			var positionY =centerY+canvasY;

            // 检查设备是否支持touch事件:
            if('ontouchend' in document)
            {
                canvas.addEventListener('touchstart', onTouchStart, false);
                canvas.addEventListener('touchmove', onTouchMove, false);
                canvas.addEventListener('touchend', onTouchEnd, false);
            }
            else
            {
                canvas.addEventListener('mousedown', onMouseDown, false);
                canvas.addEventListener('mousemove', onMouseMove, false);
                canvas.addEventListener('mouseup', onMouseUp, false);
            }
            // 画外圆
            drawouter();
            function drawouter()
            {
                context.beginPath();
                context.arc(centerX, centerY, outerRadius, 0, cir, false);
                context.lineWidth = parameters.outerLineWidth;
                context.strokeStyle = parameters.outerStrokeColor;
                context.globalAlpha =parameters.globalAlpha;
                context.fillStyle = parameters.outerFillColor;
                context.fill();
                context.stroke();
            }

            //画内圆
            drawinner();
            function drawinner()
            {
                context.beginPath();
                context.arc(movedX, movedY, innerRadius, 0, cir, false);
                context.fillStyle = parameters.innerFillColor;
                context.globalAlpha =parameters.globalAlpha;
                context.fill();
                context.lineWidth = parameters.innerLineWidth;
                context.strokeStyle = parameters.innerStrokeColor;
                context.stroke();
            }

            //touch事件::
            function onTouchStart(event)
            {
                pressed=1;
            }
            function onTouchMove(event) {
                // 阻止默认事件
                event.preventDefault();
                var touchX = event.touches[0].pageX;
                var touchY = event.touches[0].pageY;
                if(pressed==1)//只有按下状态下移动,才会触发
                {
                	if(getDeltaLength(touchX,touchY)<outerRadius){
                        movedX=parseInt(touchX-canvasX);
                        movedY=parseInt(touchY-canvasY);
					}
					// else if(getDeltaLength(touchX,touchY)<outerRadius){
					// }
                    // 清除画布
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    // 重新渲染
                    drawouter();
                    drawinner();
                }
            }
            function onTouchEnd(event)
            {
                pressed=0;
                //内圆归位
                movedX=centerX;
                movedY=centerY;
                // 清除画布
                context.clearRect(0, 0, canvas.width, canvas.height);
                // 重绘
                drawouter();
                drawinner();
            }
            //鼠标事件
            function onMouseDown(event)
            {
                pressed=1;
            }
            function onMouseMove(event)
            {
                if(pressed==1)
                {
                    if(getDeltaLength(event.pageX,event.pageY)<outerRadius){
                        movedX=parseInt(event.pageX-canvasX);
                        movedY=parseInt(event.pageY-canvasY);
                    }
                    //清除画布
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    // 重新渲染
                    drawouter();
                    drawinner();
                }
            }
            function onMouseUp(event)
            {
                pressed=0;
                // 内圆归位
                movedX=centerX;
                movedY=centerY;
                // 清除画布s
                context.clearRect(0, 0, canvas.width, canvas.height);
                // 重绘
                drawouter();
                drawinner();
            }

			//计算触点与画布中心的距离
            function getDeltaLength(x,y){
                var deltaX = Math.pow(x-positionX,2);
                var deltaY = Math.pow(y-positionY,2);
                var deltaLength = parseInt(Math.sqrt(deltaX+deltaY));
                return deltaLength;
            }
            var tan ;
			//接口: 摇杆的移动方向
			this.direction = function(){
				// 通过当前内圆(摇杆)的圆心位置与canvas中心(初始圆心)两点的反正切.可计算出角度方向:
				// snake的移动方向与此相同
				// if(pressed === 1) {
                 //    if(movedY===centerY&&movedX===centerX)  tan = 0;
                 //    if(movedY>centerY&&movedX===centerX) tan = Math.PI*3/2;
                 //    if(movedY<centerY&&movedX===centerX) tan = Math.PI/2;
                 //    else {
                 //        tan = Math.atan((movedY-centerY)/(movedX-centerX));
                 //        //第四象限
                 //        if(movedX>centerX&&movedY<centerY) tan = -tan ;
                 //        //第三象限
                 //        if(movedX<centerX&&movedY<centerY) tan =  Math.PI - tan ;
                 //        //第二象限
                 //        if(movedX<centerX&&movedY>centerY) tan =  Math.PI - tan ;
                 //        //第一象限
                 //        if(movedX>centerX&&movedY>centerY) tan = Math.PI*2 - tan ;
                 //    }
				// }
				// return 2*Math.PI-tan || 0;
				//
				if(pressed === 1){
					tan = Math.atan2(movedY-centerY,movedX-centerX);

				}
				return tan || 0;
			};
        };

});
