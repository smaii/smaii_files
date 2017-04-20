/**
 * Created by Administrator on 2017/4/14.
 */



define(function(require,exports,module){

	var img ;
	var positionX ;
	var positionY ;
	var src ;
	var food ={};
	var dead = [];//记录死亡表情的位置
	//食物种类:
	var _f = localStorage.my_food || 'face' ;
	//难易程度:
	var easy = localStorage.my_easy || "e";
	var second ;
	if(easy === 'e') second= 10000;
	else second  = 7000;
	module.exports = {

		init : function(){
			img = new Image();
			positionX = parseInt(_can1.width*Math.random());
			positionY = parseInt(_can1.height*Math.random());
			//防止超出边界:
			if(_can1.width - positionX <32) positionX =positionX-32;
			if(_can1.height - positionY <32) positionY =positionY-32;
			var n  = parseInt(Math.random()*6+1);
			src='./src/images/'+_f+n+'.png';
			food.positionX = positionX;
			food.positionY = positionY;
			food.size = 28;
		},


		draw : function(){
			img.src = src;
			_ctx2.drawImage(img,positionX,positionY,food.size,food.size);
			return food;
		},

		dead:function(){

			setInterval(function(){
				var _x = parseInt(_can1.width*Math.random());
				var _y = parseInt(_can1.height*Math.random());
				if(_can1.width - _x <32) _x =_x-32;
				if(_can1.height - _y <32) _y =_y-32;
				var span = document.createElement('span');
				span.style.left = _x+'px';
				span.style.top = _y+'px';
				dead.push([_x,_y]);
				$('#main').append(span);
			},second);

		},

		getdead :function(){
			return dead;
		}

		//吃果实的波浪特效:
		// wave :  function(){
		//
		// 	var  waveObj = function() {
		// 		this.x = [];
		// 		this.y = [];
		// 		this.alive = [];
		// 		this.r = [];
		// 		for (var i = 0; i < this.num; i++) {
		// 			this.alive[i] = false;
		// 			this.r[i] = 0;
		// 		}
		//
		// 	};
		// 	waveObj.prototype.num = 10;
		// 	waveObj.prototype.init = function() {
		// 		for (var i = 0; i < this.num; i++) {
		// 			this.alive[i] = false;
		// 			this.r[i] = 0;
		// 		}
		// 	};
		//
		// 	var _init = new waveObj();
		// 	_init.init();
		//
		// 	waveObj.prototype.draw = function() {
		// 		_ctx1.save();
		// 		_ctx1.lineWidth = 2;
		// 		_ctx1.shadowBlur = 10;
		// 		_ctx1.shadowColor = '#fff';
		// 		console.log(this.alive);
		// 		for (var i in this.alive) {
		// 			if (this.alive[i]) {
		// 				this.r[i] += 3;
		// 				if (this.r[i] > 50) {
		// 					this.alive[i] = false;
		// 					break;
		// 				}
		// 				var alpha = 1 - this.r[i] / 50;
		// 				_ctx1.beginPath();
		// 				_ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
		// 				_ctx1.strokeStyle = 'rgba(255,255,255,'+alpha+')';
		// 				console.log('draw');
		// 				_ctx1.stroke();
		// 				_ctx1.closePath();
		// 			}
		// 		}
		// 		_ctx1.restore();
		// 	};
		// 	waveObj.prototype.born = function() {
		// 		_init.init();
		// 		for (var i=0;i<this.num;i++) {
		// 			if (!this.alive[i]) {
		// 				console.log('born');
		//
		// 				this.alive[i] = true;
		// 				this.r[i] = 10;
		// 				this.x[i] = positionX;
		// 				this.y[i] = positionY;
		// 				//
		// 				return;
		// 			}
		// 		}
		// 	}
		//
		// return new waveObj();
		//
		// }

	}

});
