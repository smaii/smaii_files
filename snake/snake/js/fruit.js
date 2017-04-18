/**
 * Created by Administrator on 2017/4/7.
 */


define(function(require,exports,module){

	// var Fruit =  function(){
	//     this.num = 100;
	//     this.position =[];
	//     this.src = [];
	//
	//  };
	// Fruit.prototype.init = function(){
	// 	this.img = new Image();
	// 	for(var i = 0; i<this.num;i++){
	//
	// 		var mul = Math.random();
	// 		//初始化fruit的位置
	// 		this.position[i] = [_can1.width*mul,_can1.height*mul];
	//
	// 		var num  = parseInt(Math.random()*6);
	// 		this.src[i]='./src/images/candy'+num+'.png';
	// 	}
	//
	// };
	// Fruit.prototype.drawFruit = function(){
	// 	for(var i = 0; i<this.num;i++){
	// 		this.img.src = this.src[i];
	// 		_ctx1.drawImage(this.img,this.position[i][0],this.position[i][0],16,16);
	// 	}
	// };
	// var _f = new Fruit();
	// _f.init();
	// _f.img.onload = function(){
	// 	_f.drawFruit();
	// };
	//  _f.drawFruit()


	var img;
	var positionX = [];
	var positionY = [];
	var num = 100;
	var src = [];

	module.exports = {
		//var f= new Fruit();
		//f.init();
		// f.drawFruit();

		init : function(){
		    img = new Image();
		    var n;
			for(var i = 0; i<num;i++){

				mulX = Math.random();
				mulY = Math.random();
				positionX[i] = _can1.width*mulX;
				positionY[i] = _can1.height*mulY;
				//初始化fruit的位置
				//判断小果实初始位置是否重叠
				function pos(){
					for( var j = 0;j<i;j++){
						if(Math.abs(positionX[i]-positionX[j]) < 16 && Math.abs(positionY[i]-positionY[j]) < 16){
							mulX[i] = Math.random();
							mulY[i] = Math.random();
							pos();
						}else return;
					}
				}
				if(i>0) pos();

				n  = parseInt(Math.random()*6);
				src[i]='./src/images/candy'+n+'.png';
			}
		 },


		 draw : function(){
			if(positionX.length === num){
				for(var j = 0; j<num;j++){
					img.src = src[j];
					_ctx1.drawImage(img,positionX[j],positionY[j],16,16);
				}
			}

		  }
	}

});
