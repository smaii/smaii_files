
$(function(){

	//右侧微信扫码显示
	$("#fixd .three").mouseenter(function(){
		$("#fixd .four").show();
	}).mouseleave(function(){$("#fixd .four").hide();});


	//给放大镜加载图片序列：
	var i=1;
	var $expand=$("#main .left #expand");
	var $min=$("#main .left ul li img");
	function _choosePic(){
		$expand.find(".pic1").attr({
			src: '../birthday-gifts/images/img'+(i+3)+'.jpg',
		});
		$("#max .pic2").attr({
			src: '../birthday-gifts/images/img'+(i+6)+'.jpg',
		});
	}
	_choosePic(i);

	$min.each(function(){
		$(this).attr({src:"../birthday-gifts/images/img"+i+".jpg"});
		i++;
	});

	//小图片导航：
	$("#main .left ul li").click(function(){
		i=$(this).index()+1;
		_choosePic(i);
	});

	//放大镜，放大特效：
		

	$expand.bind("mousemove",function(e){
			$("#max").show().find(".pic2").css({
				top:-e.pageY,
				left:-e.pageX
			});
	}).mouseleave(function(){
		$("#max").hide();
	});

	//加入购物车：
	var _val=parseInt($("#val").text());
	$("#cut").click(function(){
		if(_val>1){
			_val--;
			$("#val").text(_val);
		}
	});
	$("#add").click(function(){
		_val++;
		$("#val").text(_val);
	});

	//储存cookie信息：
	$("#btn").click(function(){
		$.cookie("num",_val,{expires:7,path:"/"});
		var _choose=confirm("加入购物车成功！是否前往结算？");
		if(_choose){
			window.location.href="http://localhost:8080/cookies/myproject/cart/cart.html";
		}
	});


});

		
