
jQuery.fn.runSafe = function(param) {
	alert("hello world!");
}
var imgURL = chrome.extension.getURL("icon.png");
var passExists = $("input:password").first();

if(passExists.length){
	var parentHeight = passExists.parent().height()-5;
	var parentColor = "#ffffff";
	console.log("password field detected");

	passExists.css({"background":"url('"+imgURL+"') "+parentColor+" right top no-repeat", "background-size":parentHeight});
	passExists.mousemove(function(e){
		var x = e.pageX - passExists.offset().left;
		var y = e.pageY - passExists.offset().top;
		if(x>passExists.width()-passExists.height()){
				passExists.css("cursor","pointer");
		}else if(passExists.css("cursor")=="pointer"){
			passExists.css("cursor","");
		}
	});
}

