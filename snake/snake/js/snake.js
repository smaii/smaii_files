/**
 * Created by Administrator on 2017/2/22.
 */
//snake.js  绘制以及定义snake的行为:


define(function(require,exports,module){
	//通过joy模块拿到角度
    var joy = require('joy');
    var angle ;
    var _this;
   // 通过food得到食物的位置
    var food = require('food');
	//food.info   食物的信息,food.positionX food.positionY food.size
	var food_info = food.draw();

	//读取localstorage:
	var _id = localStorage.getItem('my_id') || '无名氏';
	_id = "ID: "+_id;
	//是否穿墙:
	var wall = localStorage.my_wall || 'true';
	//皮肤设置:
	var pifu = localStorage.my_pifu? '.'+localStorage.my_pifu : "./src/images/pifu2.png";
	//游戏音量:
	var volume = localStorage.my_volume || 0.5;
	$('#bgm')[0].volume = volume;
	$('#hit')[0].volume = volume;
	$('#death')[0].volume = volume;

	var stepX =stepY = 0;

	var _speed = document.getElementById('speed');
	var _shot = document.getElementById('shot');
	var speed =1;
	//监听touch 控制速度:
	_speed.addEventListener('touchstart', function(){
		speed = 2;
	});
	_speed.addEventListener('touchend', function(){
		speed = 1;
	});

	//发射子弹:
	// _shot.addEventListener('click', function(){
	//
	// 	_ctx3.fillStyle = 'red';
	// 	var _x=_y=0;
	// 	var a = angle;
	// 	var x0 =_this.headX[0][0];
	// 	var y0 = _this.headY[0][0];
	// 	clearInterval(timer);
	// 	var timer = setInterval(function(){
	// 		_x += 3*Math.cos(a);
	// 		_y += 3*Math.sin(a);
	// 		_ctx3.beginPath();
	// 		_ctx3.clearRect(0, 0, _can3.width, _can3.height);
	// 		_ctx3.arc(x0+_x,y0+_y,5,0,Math.PI*2);
	// 		_ctx3.fill();
	// 		_ctx3.closePath();
	// 		console.log(x0+_x,y0+_y);
	// 	},60);
	//
	// });

	var click = 0
	_shot.addEventListener('touchstart',function(){
		if(click == 0){
			_this.size += 10;
			_this.headSize +=10;
			this.style.background= "url(./src/images/down.png) center no-repeat";
			this.style.backgroundColor = 'rgba(0,0,0,0.5)'
			click = 1;
		}else{
			_this.size -= 10;
			_this.headSize -=10;
			this.style.background= "url(./src/images/up.png) center no-repeat";
			this.style.backgroundColor = 'rgba(0,0,0,0.5)'
			click = 0;
		}

	});

    var snake =function(size,headSize){
        this.MAX = 100;  //蛇的最大长度
        this.size = size || 20; //每节蛇身的长宽  ***!能被speed整除
	    this.cover = 10; //每截身体重叠的长度
	    this.headSize = headSize || 20; //蛇头的尺寸
        this.headX = [];
        this.headY = [];
        this.head = new Image();
	    this.head.src = './src/images/head.png';
        this.body = new Image();
        this.body.src = pifu;
	    for(var i = 0;i<this.MAX;i++){
		    this.headX[i] = [];
		    this.headY[i] = [];
	    }
    };
	snake.prototype.init = function(){
		// document.getElementById('speed').addEventListener('touchstart',function(){
		// 	this.speed = 2;
		// })


	};
	var dead_count = 0;
	var _span =[];
    snake.prototype.getHead =function(stepX,stepY) {

		var stepX = stepX ||0;
		var stepY = stepY ||0;
	    var x = _can2.width/2-this.headSize/2;
	    var y = _can2.height/2-this.headSize/2;
	    _this = this;
        //this.head.onload = function () {
		    _ctx2.save();
		    //清除画布
		    _ctx2.clearRect(0, 0, _can2.width, _can2.height);
		    //中心旋转的关键,两次位移,位移距离为image的中心坐标(即画图时(moveTO的点,非画布)的左上角坐标+image的宽高)
		    _ctx2.translate(_can2.width/2+stepX,_can2.height/2+stepY)
		    _ctx2.rotate(angle);
		    _ctx2.translate(-_can2.width/2-stepX,-_can2.height/2-stepY);
		    //对画布两次旋转之后(旋转在中间),此时的坐标系满足绘图标准
		    _ctx2.drawImage(this.head,x+stepX,y+stepY,this.headSize ,this.headSize );
		    _ctx2.font = '10px';
		    _ctx2.fillStyle = "green";
		    _ctx2.fillText(_id,x+stepX-10,y+stepY-10);
		    _ctx2.restore();
	   // };

	    //将head的位置储存,
			this.headX[0].unshift(x+stepX);
			this.headY[0].unshift(y+stepY);
			//用this.leng截取数组长度  
			this.headX[0].length =this.headY[0].length = (this.size-this.cover)/speed;

	    //得到死亡表情的位置:
	    var dead = food.getdead();
	    //遍历数组 判断距离:
	    dead.map(function(value,index){
            var len = getLength(_this.headX[0][0],_this.headY[0][0],value[0],value[1]);
            if(len<=(food_info.size/2)) {
	            if(!(index in _span)){
		            $("#death")[0].play();
		            $("#death")[0].onplay = function(){
			            _span.push(index);
			            dead_count++;
			            $('#main span').eq(index).animate({
			            	opacity:0
			            },500);
			            _this.head.src = './src/images/head1.png';
			            _this.body.src = './src/images/pifu5.png';
			            $('#heart img').eq(3-dead_count).attr('src','./src/images/heart2.png');
			            if(dead_count===3){

				            (function (){
					            //储存成绩:
					            localStorage.sore = count;
					            localStorage.time = new Date().toLocaleTimeString();
				            })();

				            if(confirm('YOU Eat '+count+' !!!Try Again?')){
					            stepX = stepY = 0;
					            location.reload();
				            }else{
					            location.href = '../index.html';
				            }
			            }
		            };
	            }

            }
	    });

    };

	snake.prototype.moveHead = function(){

		//实时刷新得到偏转角度:
		angle =joy.direction();
		stepX += speed*Math.cos(angle);
		stepY += speed*Math.sin(angle);
		//是否允许穿墙??
		if(wall === 'true'){
			//允许
			if(stepX>_can1.width/2 && angle>-Math.PI*0.5 && angle < Math.PI*0.5){
				//撞右边
				stepX= -_can1.width/2-this.headSize/2;
			}else if(stepX<-_can1.width/2 && Math.abs(angle)>Math.PI*0.5){
				//撞左边
				stepX = _can1.width/2+this.headSize/2;

			}else if(stepY>_can1.height/2 && angle>0){
				//撞下边
				stepY = -_can1.height/2-this.headSize/2;
			}else if(stepY<-_can1.height/2 && angle<0){
				//撞上边
				stepY = _can1.height/2+this.headSize/2;
			}

		}else{
			//不允许
			if(stepX>_can1.width/2-this.headSize/2||stepX<-_can1.width/2+this.headSize/2||stepY>_can1.height/2-this.headSize/2||stepY<-_can1.height/2+this.headSize/2){
				//储存成绩:
				if(confirm('重新开始?')){
					stepX = stepY = 0;
					location.reload();
				}else{
					location.href = '../index.html';
				}
			}
		}
		this.getHead(stepX,stepY);

	};

	var count = 0;//记录吃到的果实数量
	snake.prototype.eat = function(){

		var delLength = getLength(this.headX[0][0],this.headY[0][0],food_info.positionX,food_info.positionY);
		if(delLength<=(this.size/2+food_info.size/2)){

			$("#hit")[0].play();
			count++;
			_this.head.src = './src/images/head.png';
			_this.body.src = pifu;
			if(count%5===0){
				//每吃5个果实增大2px
				this.size+=2;
				this.headSize+=2;
			}
			//清除食物 , 重新绘制食物:
			// food.wave().born(); //bug 未解决 !!!
			// food.wave().draw();
			food.init();
			food.draw();

			//过关判定:
			// if(count>20){
			//
			// }
		}

	};

	// snake.prototype.drawBody = function(index){
	//
	// 	//将新的身体的位置存在数组中:
	// 	this.headX[index] = [].concat( this.headX[index-1]);
	// 	this.headY[index] = [].concat( this.headY[index-1]);
	//
	// 	// this.headX[index] = this.headX[index-1];//     ****这种赋值是错误的****,前一个数组总会指向后一个数组
	// 	// this.headY[index] = this.headY[index-1];
	// 	_ctx3.beginPath();
	// 	_ctx3.fillStyle = '#FEC868';
	// 	// _ctx1.shadowBlur = 1;
	// 	// _ctx1.shadowColor = '#FEC868';
	// 	//在前一截身体处画一截新身体:
	// 	_ctx3.arc(this.headX[index-1][0]+this.size/2,this.headY[index-1][0]+this.size/2,this.size/2,0,Math.PI*2);
	// 	_ctx3.fill();
	// 	_ctx3.closePath();
	//
	// };

	//var _len = [];
	snake.prototype.moveBody = function (index) {
		var _length = (this.size-this.cover)/speed;
		//两截身体的距离:
		 //_len[index]= getLength(this.headX[index][0], this.headY[index][0], this.headX[index-1][0], this.headY[index-1][0]);
		//console.log(index,_len[index]);
		_ctx3.clearRect(0, 0, _can3.width, _can3.height);
		for(var i=1;i<=index;i++){
			//if (_len[i] >= this.size) {
				//move
				//相邻两截身体距离拉开到size,最后一截身体才开始移动:
			if(pifu.indexOf('false') != -1){
				//纯色皮肤
				_ctx3.beginPath();
				var c1 = parseInt(Math.random()*255);
				var c2= parseInt(Math.random()*255);
				var c3 = parseInt(Math.random()*255);
				_ctx3.fillStyle = 'rgb('+c1+','+c2+','+c3+')';
				//在前一截身体处画一截新身体:
				_ctx3.arc(this.headX[i-1][_length-1]+this.size/2,this.headY[i-1][_length-1]+this.size/2,this.size/2,0,Math.PI*2);
				_ctx3.fill();
				_ctx3.closePath();
			}else{

				//if(this.speed ===2){
						var newX = this.headX[i-1][_length-1];
						var newY = this.headY[i-1][_length-1];
				//}

				_ctx3.drawImage(this.body,newX,newY,this.size,this.size);
			}

				//更新每截身体的位置数组:
				this.headX[i].unshift(this.headX[i-1][_length-1]);
				this.headY[i].unshift(this.headY[i-1][_length-1]);
				//用length截取数组长度    但是length写在snakeObj里没效???
				this.headX[i].length = _length;
				this.headY[i].length = _length;
			//}
		}
	};

	//计算点(x0,y0),到点(x1,y1)的距离:
	function getLength(x0,y0,x1,y1) {
		var x2 = Math.pow(x0-x1,2);
		var y2 = Math.pow(y0-y1,2);
		return parseInt(Math.sqrt(x2+y2));
	}

    //出口
	var s = new snake();
   exports.entry = function() {

	   s.moveHead();
	   s.eat();
	   if(count>=1) s.moveBody(count);

   }

});
