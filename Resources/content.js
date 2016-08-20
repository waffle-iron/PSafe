
var imgURL = chrome.extension.getURL("icon.png");
var passExists = $("input:password").first();
var change=false;


function checkPasswords(){
	passExists = $("input:password");
	if(passExists.length){
		console.log(passExists);
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

		passExists.click(function(e){
			passExists.trigger('keyup');
			var x = e.pageX - passExists.offset().left;
			var y = e.pageY - passExists.offset().top;
			if(x>passExists.width()-passExists.height()){
				chrome.extension.sendMessage({
					type: "initiate", 
					data: {
						myProperty: "Hello"
					}
				});

			}	
		});
		chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
			passExists.focus()
			passExists.val(msg.action);
			passExists.keypress();
			passExists.change();
			passExists.keydown();
			passExists.keyup();
		});
	}
}
$(document).click(function(e) {
	if(change){
		checkPasswords();
		change=false;
	}
});
$(document).on('DOMNodeInserted', function(e) {
	change=true;
});
checkPasswords();