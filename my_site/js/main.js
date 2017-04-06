/**
 * Created by Administrator on 2017/3/28.
 */
$(function(){


	var arr;//项目经验数据
	//注意路径,相对路径真神奇,与index.html同级
	$.getJSON("item.json",function(data){
		arr = data;
	});

	//给menu里的span设置和a一样的宽度
	function change_span(){
		$('#menu a span').each(function(i){
			var currentWidth = $('#menu a').eq(i).width();
			$(this).width(currentWidth);
		});
	}
	change_span();
	//窗口改变时,重新获取
	$(window).resize(function(){
		change_span();
	});

	//获取天气
	var _item = $('#weather .content ul');
	var city;
	//先获取当前客户端的城市  (根据IP定位,第三方提供)
	jQuery.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
		city = remote_ip_info["city"];
		$('.section1 #weather input[type=text]').attr({placeholder:city});
		getWeather(city);

	}) ;

	//点击搜索按钮
	$('#weather .search button').click(function(){
		city = $('#weather .search input').val();
		getWeather(city);
	});
	//敲击enter建
	$('#weather .search input').focus(function(){
		//获得input焦点 并按下键盘时触发,
		$(window).keydown(function(e) {
			if(e.key ==="Enter"){
				city = $('#weather .search input').val();
				getWeather(city);
			}
		});
	});
	//封装动态获取天气的函数
	function getWeather(city){
		$.ajax({
			url:"http://v.juhe.cn/weather/index?format=2&cityname="+encodeURI(city)+"&dtype=&format=&key=2edc7b29b1c85597f72bf8ddb5d28877",
			dataType:'jsonp',
			success:function(data){
				var today = data.result.today;
				_item.find('.date').html(today.date_y+"&emsp;&emsp;&emsp;"+today.week+"&emsp;&emsp;&emsp;"+today.city);
				_item.find('.tem').html(today.weather+"&emsp;&emsp;风力 : "+today.wind+"&emsp;&emsp;"+today.temperature);
				_item.find('.some').html();
				var _tip =today.dressing_advice.replace(/(.)(?=[^$])/g,'$1-').split('-');
				console.log(typeof  today.dressing_advice)
				_item.find('.advice').html("Tips :<br>&emsp;&emsp;");
				(function(){
					var i=0;
					var timer = setInterval(function(){
						_item.find('.advice').append(_tip[i])
						i++;
					},100);
					if(i===_tip.length) {clearInterval(timer);return;}
				})();
			}
		});
	}
	//当屏宽<600时,取消左侧导航
	var _w  = document.body.clientWidth ;
	var _nav = _scroll = true;
	var _01 = 1;
	if(_w<600) {
		_nav = false;
		$('#scroll img').click(function(){
			$(this).attr({src:'src/scroll'+_01%2+'.png'});
			_scroll = false ;
			_01++;
		});
	}

	//定义一个全局属性 timer ,来自page3
	var timer=[];
	$('#container').fullpage({
		// sectionsColor : ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],//重要属性
		menu:'#menu',
		anchors: ['page1', 'page2', 'page3', 'page4','page5'],
		navigation:_nav,
		navigationPosition:'right',
		autoScrolling:_scroll,
		css3:true,
		keyboardScrolling:true,
		verticalCentered:true,

		// resize:true,
		//滑到某一屏(index)时的callback
		afterLoad: function(anchorLink, index){
			//给菜单(menu)加上active样式:
			$('#menu a').each(function(i){
				if(i ===index-1) $(this).addClass('active');
			});

			if(index===1){
				$('.section1 .self img').css({"visibility": "visible"}).addClass("nimated bounceIn");
			}
			if(index === 2){
				//给每一个li加上动画
				$('.section2 ul li').each(function(i){
					if(i%2===0){
						$(this).delay(i*100).animate({
							left:0
						},500,"linear");
					}else{
						$(this).delay(i*100).animate({
							right:0
						},500,"linear");
					}
				})
			}
			if(index === 3){

				//逐字显示:

				arr.map(function(i,j){
					//原生遍历方法map(),i=arr[j], **-异步的-***
					//'$1-'正则表达式的第1个子式(即'(.)')加上'-'
					var arr_i = i.replace(/(.)(?=[^$])/g,"$1-").split("-");
					var index = 0;
					if(j===arr.length-1) {
						addWord();
					}else{
					 	$('#container .section3 .bottom ul li:eq('+j+')').mouseenter(function(){
					 		addWord();
					 	}).mouseleave(function(){
							clearTimeout(timer[j]);
					 	});
					}
					//延时器  每100ms向p中添加一个字符
					function addWord() {
						//一共有三个timer !!! 离开页面清除时,必须三个都清除!!!!!!!!!!
						timer[j] = setTimeout(addWord,50);
						if (index < arr_i.length) {
							//j=0,1,2
							$('#container .section3 .bottom ul li:eq('+j+') p').last().append(arr_i[index]);
							index++;
						}
						else {
							clearTimeout(timer[j]);
							return;
						}
					}
				});

			}
			//my demo
			if(index === 4){
				$('.section4 ul li').each(function(i){
					// _this = $(this);
					// (function(){
					// 	console.log("out",_this,i)// why?
					// 	setTimeout(function(){
					// 	_this.addClass('toroll');
					// 	console.log("in",_this,i);// why?
					// },i*500);})(i,_this);
					var _count = 1;
					$(this).addClass('toroll');
					$(this).mouseenter(function(){

					});
				})
			}
			if(index===5){
				//结束语动画
				$('.section5 p').each(function(i){
					$(this).delay(i*500).animate({
						top:0
					},500-i*50);
				});
			}
		},
		onLeave : function(index,nextIndex,direction){
			if(index ===1){
				$('.section1 .self img').css({"visibility": "hidden"}).removeClass("nimated bounceIn");
			}
			if(index ===2){
				$('.section2 ul li').each(function(i){
					if(i%2===0){
						$(this).stop(true,true).css({"left":"100%"});
					}else{
						$(this).stop(true,true).css({"right":"100%"});
					}
				})
			}
			if(index === 3){
				//清除延时器  三次!!!
				timer.map(function(i){
					clearTimeout(i);
				});
				$('#container .section3 .bottom ul li').each(function(i){
					//清除绑定的moseenter事件  否则延时器会累积
					$(this).unbind().find('p').last().html("");
				});
			}
			if(index===4){
				// $('.section4 ul li').each(function(i){
				// 	$(this).removeClass('toroll');
				// });
				$('.section4 ul li').removeClass('toroll');//不需要index,所以无需each()
			}
			if(index===5){
				$('.section5 p').each(function(i){
					$(this).stop(true,true).css({"top":"100%"});
				});
			}

		}
	});

});