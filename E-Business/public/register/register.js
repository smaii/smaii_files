
$(function(){
	$("#head .left b:first").click(function(){
		$("#page_mask").show();
		$("#register .right_reg").css({"display":"none"});
		$("#register .right_log").css({"display":"block"});
		$(".init").animate({"right":"0"},600);
		
		
	});
		

	$("#head .left b:last").click(function(){
		$("#page_mask").show();
		$("#register .right_log").css({"display":"none"});
		$("#register .right_reg").css({"display":"block"});
		$(".init").animate({"right":"0"},600);

	});

	$("#close").click(function(){
		$(".init").animate({"right":"-80%"},600);
		$("#page_mask").hide();
	});


});

$(function(){
	$("#register .left a").each(function(){
		//给注册页的微博，QQ，支付宝加上logo背景
		$(this).css({
			"background":"url('images/login.png') no-repeat",
			"backgroundPosition":"0 "+-$("#register .left a").index($(this))*1.55*44+"px",
		});
	});

	//封装表单验证方法formTest()
	function formTest(){

		var _regMail=/^\w+@[a-z]+|[0-9]+(\.[a-z]+)+$/i;
		var _regPsd=/^[a-z]\w{5,21}$/i;
			//判断邮箱是否正确
		$("#register .right_reg #mail").blur(function(){
			if(_regMail.test($(this).val())===false&&$(this).val()!==""){
				$("#register .right_reg .tips1").show().text("格式不正确，请输入邮件格式！");
			}else if(_regMail.test($(this).val())){
				$("#register .right_reg .tips1").hide();
			}
			return ;
		});
			//判断密码格式是否正确，6—20位
		$("#register .right_reg #psd").blur(function(){
			if(_regPsd.test($(this).val())===false&&$(this).val()!==""){
				$("#register .right_reg .tips2").show().text("密码长度需介于6和20之间");
			}else if(_regPsd.test($(this).val())){
				$("#register .right_reg .tips2").hide();
			}
			return ;
		});

		$("#register .right_reg #btn").click(function(){
			var _mail=$("#register #mail").val();
			var _psd=$("#register #psd").val();
			     //邮箱和密码同时满足条件，允许提交
			if(_regMail.test(_mail)&&_regPsd.test(_psd)){
				$("#register .right_reg .tips").hide();
				alert("恭喜您，注册成功！");
				//记录数据，保存在cookie
				$.cookie(_mail,_psd,{expires:7,path:"cookies/myproject"});
				_mail=$.cookie(_mail);
				_nameChange(_mail);
				//关闭注册页
				$(".init").animate({"right":"-80%"},600);
				$("#page_mask").hide();
			}
			if(_mail===""){
				$("#register .right_reg .tips1").show().text("邮箱不能为空");
			}
			if(_psd===""){
				$("#register .right_reg .tips2").show().text("密码不能为空");
			}
		});

	}
	formTest();

		//在登录注册页点击登录按钮时，调转到注册
	$("#register .right_reg span b").click(function(){

		$("#register .right_reg").css({"display":"none"});
		$("#register .right_log ").css({"display":"block"});
	});

	//在登录注册页，点击注册按钮时，调转到登录
	$("#register .right_log span b").click(function(){

		$("#register .right_log").css({"display":"none"});
		$("#register .right_reg").css({"display":"block"});
	});

	$("#register .right_log #btn_l").click(function(){//点击立即登录按钮
		_login();   //调用登录验证函数


	});
	function _login(){   //登录验证
			//"main%40mail.com=fffff5654; local%40gmail.com=localcookie"
			//{main@mail.com: "fffff5654", local@gmail.com: "localcookie"}
			//var _regMail=/^\w+@[a-z]+|[0-9]+(\.[a-z]+)+$/i;
			//var _regPsd=/^[a-z]\w{5,21}$/i;
		var _loginName = $("#register .right_log #mail").val();
		var _loginPsd = $("#register .right_log #psd").val();
		var _cookie=decodeURIComponent(document.cookie);
		var _reg=new RegExp("(^| )"+_loginName+"=.{5,}(;|$)");
		var  _result=_cookie.match(_reg);
		//alert(_result);
		var _val=_result[0].split("=")[1];
		if(!_result){
			$("#register .right_log .tips1").show().text("您输入的用户名不正确！");
		}else if(_val!=_loginPsd){
			$("#register .right_log .tips2").show().text("您输入的密码不正确！");
		}else {
			$("#close").click(function(){
				$(".init").animate({"right":"-80%"},0);
				$("#page_mask").hide();
			});

			_nameChange();
		}
	}
	_login();

	function _nameChange(_name){      //在主页显示用户名
		$("#head .left").html("<li>Hi，<a href=''>"+_name+"</a></li><li><b>退出</b></li>");
	}

});

// function toggleStrAndObj(_arg){
// 	if(typeof _arg ==="string"){
// 	}else if(typeof _arg ==="object"){
// 	}
// }

