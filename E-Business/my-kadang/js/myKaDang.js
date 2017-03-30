

$(function(){
	$("#search .in1").mouseenter(function(){
		$(this).animate({width: 250}, 500);
	}).mouseleave(function(){
			$(this).stop(true).animate({width: 200}, 500);
	});

	$(window).scroll(function(){
			var _t=$(this).scrollTop();
			if(_t>200){
				$("#back-top p").not(".p1").show()
				.mouseenter(function(){
					$("#back-top .p2").hide();
					$("#back-top .p3").show();

				})
				.mouseleave(function() {
					$("#back-top .p2").show();
					$("#back-top .p3").hide();
				})
				.click(function(){
					$("html,body").animate({scrollTop:0},0);
					$("#back-top p").not(".p1").hide();
				});
			}
			if(_t<200){
				$("#back-top p").not(".p1").hide();
			}
	});
	
});