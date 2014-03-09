$(document).ready(function() {
	$('img.landing_img').hide();
	var $winheight; 
	var $winwidth;
	var $bar_height = $winheight*.6;
	var $title = document.getElementById("title");
	var $menu = document.getElementById("menu");
	var $intro = document.getElementById("intro");
	var $intro_img = document.getElementById("erica_portrait");
	var $menu_item = document.getElementsByClassName("menu_item");
	var $bar = document.getElementById("nav");
	var $toggle = document.getElementById("menu_toggle");
	var $menu_height = $("#menu").height();
	var $menu_width = $("#menu").width();
	var $title_height = $("#title").height();
	var $title_width = $("#title").width();
	var $menu_indicator = 1;
	var $menu_toggled = 0;
	var $document_scroll = 0;
	
	if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    $winwidth = window.innerWidth;
	    $winheight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    $winwidth = document.documentElement.clientWidth;
	    $winheight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    $winwidth = document.body.clientWidth;
	    $winheight = document.body.clientHeight;
	}
	
	
	if($winheight > 700){
		$(".landing_section").attr({height: $winheight, width: $winwidth})
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
			$menu.style.height = $winheight*.6+94+"px";
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
	
	//Fade the home image in, set the bar's height positon, call scale toggle
	$('img.landing_img').fadeIn(2000);
	$bar.style.top = $winheight*.6+"px";
	$intro.style.height = ($winheight*.4)-98+"px";
	$intro_img.style.top = (($winheight*.4)-98-250)/2+"px";
	scale_toggle();
	
	
	$(window).bind("resize", function(){
		
		
		if( typeof( window.innerWidth ) == 'number' ) {
		    //Non-IE
		    $winwidth = window.innerWidth;
		    $winheight = window.innerHeight;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		    //IE 6+ in 'standards compliant mode'
		    $winwidth = document.documentElement.clientWidth;
		    $winheight = document.documentElement.clientHeight;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		    //IE 4 compatible
		    $winwidth = document.body.clientWidth;
		    $winheight = document.body.clientHeight;
		}
		
		$bar_height = $winheight*.6;
		$intro_height = $winheight*.4;
		$intro_img.style.top = (($winheight*.4)-98-250)/2+"px";
		
		$title_height = $("#title").height();
		if($winheight > 700){
			$(".landing_section").attr({height: $winheight, width: $winwidth})
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
	
	
	$(window).scroll(function(){
		//Get delta scroll
		var $scroll_amt = document.body.scrollTop-$document_scroll;
		$document_scroll = document.body.scrollTop;
		//If the window is scrolled between 0 and the vertical position of the nav bar

		if((document.body.scrollTop>= 0)&&($document_scroll < $winheight*.6)){
			var $bar_pos = parseFloat($bar.style.top);
			$bar.style.top = ($bar_pos-$scroll_amt)+"px";

		}
		if($document_scroll > $winheight*.6){
			$bar.style.top = "0px";
		}
		
		if($document_scroll == 0){
			$bar.style.top = $winheight*.6;			
		}
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