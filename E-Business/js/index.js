

//轮播效果：

$(function(){
	var i=1;
	var _t=4000;
	var timer;
	var _dot=$("#main #banner-click span");
	function _timer(_arg){
		
		clearTimeout(timer);

				//轮播圆圈索引滚动
		_dot.removeAttr('style')  //先将行内sytle清除，否则会让:hover失效
		.eq(i-1).css({
			 "background":"red",
		});
			//轮播动画
		$("#main #banner").css({
			background:function(){
				var _url="url(images/banner0"+i+".jpg)"+" no-repeat";
				return _url;
			},
			opacity:0.3,
		}).animate({
			opacity:1,
		},200,function(){  //回调函数   改变轮播背景图url里的索引
			if(i<4&i>0){
				i++;
			}else if(i===0){
				i=4;
			}else{
				i=1;
			}
			
			//return i;  可以不要
		});

		
		

		timer=setTimeout(_timer,_t);
	}
	_timer();
	
	// var timer=setInterval(_timer,_t);

		//轮播点击跳转
	_dot.click(function(){
			i=_dot.index(this)+1;
			$("#main #banner").stop(true);
			clearTimeout(timer);
			_timer();
		});
	//左右箭头点击切换轮播图
	$("#banner").find("._left").click(function(){
		i=i--;
		$("#main #banner").stop(true);
		clearTimeout(timer);
		_timer();
	}).end().find("._right").click(function(){
		i=i++;
		$("#main #banner").stop(true);
		clearTimeout(timer);
		_timer();
	});

			//上一张图片和下一张图片的切换动画
	$("#banner").mouseenter(function(){
			$(this).find("._left").show().animate({left: 10},100);
			$(this).find("._right").show().animate({right: 10},100);
		}).mouseleave(function() {
			$(this).find("._left").hide().css({left:50});
			$(this).find("._right").hide().css({right:50});
		});


	$("#banner img").mouseenter(function(){
		$(this).css({opacity:1,});
	}).mouseleave(function(){
		$(this).css({opacity:0.5,});
	});

});



//主页左侧菜单栏，ajax请求数据，
//

$(function(){
	$.ajax({
		url: 'list.json',
		type: 'post',
		dataType: 'json',
		success:function(_data){  //成功则返回数据_data,格式为json
			console.log(_data);
			var index=0;
			var _key=[];
			for (var key in _data) {
				$("#menu01 li").eq(index).text(key);//一级菜单动态赋值
				index++;
				_key.push(key);
			}
			console.log(_key);
			$("#menu01 li").mouseenter(function(){
				var _index=$(this).index();
				var key=_key[_index];
				$("#menu02").show();
				for (var i = 0; i < _data[key].length; i++) {
					$("#menu02").find("li").eq(i).text(_data[key][i]);//二级菜单动态赋值
				}
			});
			//二级菜单的显示与隐藏
			$("#menu01").bind("mouseleave",function(e){
				if(e.clientY<=240||e.clientY>=511){
					$("#menu02").hide();
				}
				// console.log(e.clientY);
			});
			$("#menu02").mouseleave(function(){
				$(this).hide();
			});

		}
	})
	.done(function() {
		console.log("success");
	});


	
});




$(function(){
	//top按钮，回到顶部
	$(window).scroll(function(){
			var _t=$(this).scrollTop();
			// console.log(_t);
			if(_t>200){
				$("#right-fix .top").show()
				.click(function(){
					$("html,body").animate({scrollTop:0},0);
					_t=0;
				});
			}
			if(_t<200){
				$("#right-fix .top").hide();
			}
	});


	//laddar效果，tab切换？
	$(window).scroll(function(){
			var _pageY=$(this).scrollTop();
			var $nav=$("#nav .item li");
			if(_pageY>=1587){
				$("#nav .item").css({
					position:"fixed",
					top:-30,
					boxShadow:"0 1px 2px #999"
				});
				
			}else{
				$("#nav .item").removeAttr("style");
			}
			 if(_pageY>=1587&&_pageY<2735){$nav.removeClass('bgc').eq(0).addClass('bgc');}
			 if(_pageY>=2735&&_pageY<3980){$nav.removeClass('bgc').eq(1).addClass('bgc');}
			 if(_pageY>=3980&&_pageY<5226){$nav.removeClass('bgc').eq(2).addClass('bgc');}
			 if(_pageY>=5226&&_pageY<6086){$nav.removeClass('bgc').eq(3).addClass('bgc');}
			 if(_pageY>=6086&&_pageY<7000){$nav.removeClass('bgc').eq(4).addClass('bgc');}

	});
	$("#nav .item li").click(function(){
		var index=$(this).index();
		switch(index){
			case 0:$("html,body").animate({scrollTop:1587},"fast");break;
			case 1:$("html,body").animate({scrollTop:2735},"fast");break;
			case 2:$("html,body").animate({scrollTop:3980},"fast");break;
			case 3:$("html,body").animate({scrollTop:5226},"fast");break;
			case 4:$("html,body").animate({scrollTop:6086},"fast");
		}
	});
});