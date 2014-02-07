$(document).ready(function() {
	$('img.landing_img').hide();
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
	
	
	if($winheight > 700){
		$(".section").attr({height: $winheight, width: $winwidth})
	}
	if($winwidth > $winheight*1.5) { 
		$("img.landing_img").attr({width: $winwidth, left: 0});
		document.getElementById("splash").style.left = 0+"px";
	} else if ($winheight*1.5 > $winwidth) {
		var $excess = $winwidth-($winheight*1.5);
		$winheight = $(window).height();
		$winwidth = $(window).width();
		$("img.landing_img").attr({
			height: $winheight,
		});
		document.getElementById("splash").style.left = $excess/2+"px";
	}
	
	/*
	A function that checks the dimensions of the page and adjusts the main navigation bar appropriately. If page slims enough, navigation it toggled to mobile view by sliding to the right hand side of the page.
	*/
	function scale_toggle(){
		//Calculate how big the menu could be
		var $menuSpace = $winwidth-535;
		$bar.style.top = $winheight*.66+"px";
		
		//If there's not enough space for the menu, toggle it to mobile view
		if($menuSpace <= 356){
			//If the menu is toggled to web view
			if($menu_indicator === 1){
				//remove the float property from the menu elements
				for(var $i=0; $i<$menu_item.length; $i++){
					$menu_item[$i].style.cssFloat = "none";
				}
				//set the menu hidden from the right of the screen
				$menu.style.right = "-175px";
				//Indicate the menu is toggled to mobile view and off screen
				$menu_toggled = 0;
				$menu_indicator = 0;
				//Set the icon to be displayed
				$toggle.style.display = "inline";
				//set the width of the menu
				$menu.style.width = "150px";
				//add padding
				$menu.style.paddingTop = "25px";
				//reset what the menu width is
				$menu_width = $("#menu").width();
			}
			$menu.style.height = $winheight*.66+94+"px";
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
	
	//Fade the home image in
	$('img.landing_img').fadeIn(2000);
	scale_toggle();
	
	$(window).bind("resize", function(){
		$winwidth = $(window).width();
		$winheight = $(window).height();
		$title_height = $("#title").height();
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
		
		//Trigger the scale_toggle event to check if the nav bar needs to be toggled to mobile view
		scale_toggle();
	});
	
	$("#menu_toggle").click(function(){
		if($menu_toggled === 0){
			console.log("send out");
			$("#menu").animate({
				right : "0px",
			},1000);
			$menu_toggled = 1;
		}else{
			console.log("bring in");
			$("#menu").animate({
				right : "-=175px",
			},1000);
			$menu_toggled = 0;
		}
	});	
});