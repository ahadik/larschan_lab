$(document).ready(function() {
	$('img.landing_img').hide();
	var $winheight = $(window).height(); 
	var $winwidth = $(window).width();
	if($winheight > 700){
		$(".section").attr({height: $winheight, width: $winwidth})
	}
	if($winwidth > $winheight*1.5) { 
		$("img.landing_img").attr({width: $winwidth, left: 0});
		document.getElementById("splash").style.left = 0+"px";
	} else if ($winheight*1.5 > $winwidth) {
		var $excess = $winwidth-($winheight*1.5);
		var $winheight = $(window).height();
		var $winwidth = $(window).width();
		$("img.landing_img").attr({
			height: $winheight,
		});
		document.getElementById("splash").style.left = $excess/2+"px";
	}
	$(window).bind("resize", function(){
		$winwidth = $(window).width();
		$winheight = $(window).height();
		if($winheight > 700){
			$(".section").attr({height: $winheight, width: $winwidth})
		}
		if($winwidth > $winheight*1.5) {
			$("img.landing_img").attr({
				width: $winwidth,
				height: $winwidth*(2/3),
			});
			document.getElementById("splash").style.left = 0+"px";
		} else if($winwidth < $winheight*1.5) {
			var $excess = $winwidth-($winheight*1.5);
			$("img.landing_img").attr({
				height: $winheight, width: $winheight*1.5
			});
			document.getElementById("splash").style.left = $excess/2+"px";
		}	
	});
	$('img.landing_img').fadeIn(2000);
}); 

$(document).ready(function() {
	var $winheight = $(window).height(); 
	var $winwidth = $(window).width();
	var $title = document.getElementById("title");
	var $menu = document.getElementById("menu");
	var $menu_item = document.getElementsByClassName("menu_item");
	var $bar = document.getElementById("nav");
	var $toggle = document.getElementById("menu_toggle");
	var $menu_height = $("#menu").height();
	var $menu_width = $("#menu").width();
	var $title_height = $("#title").height();
	var $title_width = $("#title").width();
	var $menu_indicator = 1;
	var $menu_toggled = 0;
	
	function scale_toggle(){
		//Calculate how big the menu could be
		var $menuSpace = $winwidth-535;
		
		//If there's enough space for the menu, toggle it visible
		if($menuSpace <= 356){
			if($menu_indicator === 1){
				for(var $i=0; $i<$menu_item.length; $i++){
					$menu_item[$i].style.cssFloat = "none";
				}
				$menu.style.right = "-175px";
				$menu.style.height = $winheight*.66+"px";
				$toggle.style.display = "inline";
				$menu_indicator = 0;
				$menu.style.width = "150px";
				$menu.style.paddingTop = "25px";
				$menu_width = $("#menu").width();
			}
		}else{
			if($menu_indicator === 1){
				for(var $i=0; $i<$menu_item.length; $i++){
					$menu_item[$i].style.cssFloat = "right";
				}
				$menu.style.right = "0px";
				$toggle.style.display = "none";
				$menu.style.width = $winwidth-535+"px";
				$menu_width = $("#menu").width();
				$menu.style.height = "inherit";
				$menu.style.paddingTop = "0px";
			}
			$menu_indicator = 1;
		}
	}
	
	scale_toggle();
	
	$(window).bind("resize", function(){
		$winheight = $(window).height(); 
		$winwidth = $(window).width();
		$title_height = $("#title").height();
		scale_toggle();
	});
	
	$("#menu_toggle").click(function(){
		if($menu_toggled === 0){
			console.log("bring in");
			$("#menu").animate({
				right : "0px",
			},1000);
			$menu_toggled = 1;
		}else{
			console.log("send out");
			$("#menu").animate({
				right : "-=175px",
			},1000);
			$menu_toggled = 0;
		}
	});	
});