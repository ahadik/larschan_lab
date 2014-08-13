var $winheight; 
var $winwidth;
var $bar_top = .6;
var $intro_top = 1-$bar_top;
var $bar_height = $winheight*$bar_top;
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
var $splash = document.getElementById("splash");
var $menu_indicator = 1;
var $menu_toggled = 0;
var $document_scroll = 0;
var $landing = document.getElementById("landingWrapper");
var scrollBool = true;
var socket = io.connect();
var formApp = new Form(socket);

publications = [];
getPublications(publications);

function moveArrow(destination){
	scrollBool = false;
	$("#arrow").animate({
			left: destination+20+"px"
	}, 1000, function(){
		scrollBool = true;
	});
}

function emailSubmit(){
	
	var messageName = $("#formname").val();
	var messageEmail = $("#formemail").val();
	var messageMessage = $("#formmessage").val();
	
	formApp.sendMessage(messageName, messageEmail, messageMessage);
	
	return false;
}

function confirmSubmission(){
	$('#formConfirm').animate({
		top: 0+"px"
	}, 500, function(){
		$('#formConfirm').delay(5000).animate({
			top: -25+"px"
		}, 500, function(){});
	});
	$("#formname").val('');
	$('#formemail').val('');
	$('#formmessage').val('');
}

$(document).ready(function() {
	$('#splash').hide();
	$winheight; 
	$winwidth;
	$bar_top = .6;
	$intro_top = 1-$bar_top;
	$bar_height = $winheight*$bar_top;
	$title = document.getElementById("title");
	$menu = document.getElementById("menu");
	$intro = document.getElementById("intro");
	$intro_img = document.getElementById("erica_portrait");
	$menu_item = document.getElementsByClassName("menu_item");
	$bar = document.getElementById("nav");
	$toggle = document.getElementById("menu_toggle");
	$menu_height = $("#menu").height();
	$menu_width = $("#menu").width();
	$title_height = $("#title").height();
	$splash = document.getElementById("splash");
	$title_width = $("#title").width();
	$menu_indicator = 1;
	$menu_toggled = 0;
	$document_scroll = 0;
	$landing = document.getElementById("landingWrapper");
	
	socket.on('formSuccess', function(){
		confirmSubmission();
	});
	
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
	
	
	$bar_height = $winheight*$bar_top;
	$intro_height = $winheight*$intro_top;
	
	$title_height = $("#title").height();
	if($winheight > 700){
		$(".landing_section").attr({height: $winheight, width: $winwidth})
	}
	
	//Call resizeLanding function to set the background image properly
	resizeLanding();

	$landing.style.height = $winheight;
	$landing.style.width = $winwidth;

	//scale_toggle();

	//Fade the home image in, set the bar's height positon, call scale toggle
	var bg = $('#splash').css('background-image');
	if (bg) {
		
		var src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
	
		//console.log(src);
		var	$img = $('<img>').attr('src', src).on('load', function() {
	
				$('#splash').fadeIn(2000);
		
		});
	}
	
	//window.onscroll = function(){
	/*
	$(window).scroll(function(){
	
		
	
		//Get delta scroll
		var $scroll_amt = document.body.scrollTop-$document_scroll;
		$document_scroll = document.body.scrollTop;
		//If the window is scrolled between 0 and the vertical position of the nav bar
		
	
		if((document.body.scrollTop>= 0)&&($document_scroll < $winheight*$bar_top)){
			var $bar_pos = parseFloat($bar.style.top);
			$bar.style.top = ($bar_pos-$scroll_amt)+"px";
			
		}
		if($document_scroll > $winheight*$bar_top){
			$bar.style.top = "0px";
		}
		
		if($document_scroll == 0){
			$bar.style.top = $winheight*$bar_top;			
		}
		var arrow = document.getElementById("arrow");
		var teamHeight = document.getElementById("team").offsetTop;
		var teamLeft = $("#teamNav").offset().left;
		var aboutHeight = document.getElementById("about").offsetTop;
		var aboutLeft = $("#aboutNav").offset().left;
		var updatesHeight = document.getElementById("updates").offsetTop;
		var updatesLeft = $("#updatesNav").offset().left;
		var publicationsHeight = document.getElementById("publications").offsetTop;
		var publicationsLeft = $("#publicationsNav").offset().left;
		var contactHeight = document.getElementById("contact").offsetTop;
		var contactLeft = $("#contactNav").offset().left;
		var pressHeight = document.getElementById("press").offsetTop;
		var pressLeft = $("#pressNav").offset().left;
		
		if((Math.abs(teamHeight - $document_scroll)<50)&&(scrollBool)){
			moveArrow(teamLeft);
		}
		if((Math.abs(aboutHeight - $document_scroll)<50)&&(scrollBool)){
			moveArrow(aboutLeft);
		}
		if((Math.abs(updatesHeight - $document_scroll)<50)&&(scrollBool)){
			moveArrow(updatesLeft);
		}
		if((Math.abs(publicationsHeight - $document_scroll)<50)&&(scrollBool)){
			moveArrow(publicationsLeft);
		}
		if((Math.abs(contactHeight - $document_scroll)<50)&&(scrollBool)){
			moveArrow(contactLeft);
		}
		if((Math.abs(pressHeight - $document_scroll)<50)&&(scrollBool)){
			moveArrow(pressLeft);
		}
	});
	*/
	
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
		
		$intro_height = $winheight*.4;
		$intro_img.style.top = (($winheight*.4)-98-250)/2+"px";
		
		$title_height = $("#title").height();
		if($winheight > 700){
			$(".landing_section").attr({height: $winheight, width: $winwidth})
		}
		
		resizeLanding();
		
		var barRatio = ($("#nav").offset().top- $(window).scrollTop())/$winheight;
		
		//$bar.style.top = $winheight*barRatio+"px";
		//$intro.style.height = ($winheight*$intro_top)-98+"px";	
		
		//Trigger the scale_toggle event to check if the nav bar needs to be toggled to mobile view
		//scale_toggle();
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



function resizeLanding(){

	if($winwidth > $winheight*1.5) {
	
		$splash.style.backgroundSize = $winwidth+"px "+$winwidth*(2/3)+"px";
	
		document.getElementById("splash").style.left = 0+"px";
	} else if($winwidth < $winheight*1.5) {
		//calculate how much more than the width of the window is than 1.5x the height of the window
		var $excess = $winwidth-($winheight*1.5);
		//console.log($excess);
		$splash.style.backgroundSize = $winheight*1.5+"px "+$winheight+"px";
		
		document.getElementById("splash").style.backgroundPositionX = $excess/2+"px";
	}
	
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

function getPublications(publications) {
	$.getJSON('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=larschan,erica[author]&retmode=json', function(data){
		
		var ids = data.esearchresult.idlist;
		
		return(iterateJSON(ids, publications));
	});
}

function iterateJSON(idlist, publications) {

	var id = idlist.pop();
	$.getJSON('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id='+id+'&retmode=json', function(summary){

		var citation = "";
		
		for(author in summary.result[id].authors){
			//console.log(summary.result[id].authors[author].name);
			citation+=summary.result[id].authors[author].name+", ";
		}
		citation+=" \\\""+summary.result[id].title+"\\\" <i>"+summary.result[id].fulljournalname+"</i> "+summary.result[id].volume+"."+summary.result[id].issue+" ("+summary.result[id].pubdate+"): "+summary.result[id].pages+".";
		
		//console.log(citation);
		publications.push(citation);
		
		if(idlist.length!=0){
			iterateJSON(idlist, publications);
		}else{
			return(publications);
		}
				
	});
}