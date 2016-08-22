
var imgURL = chrome.extension.getURL("icon.png");
var passExists = $("input:password").first();

		$("form").submit(function(){
			var user =$("input[name*='user']").val();
		

	var pass =$("input[name*='pass']").val()
		});
	


function checkPasswords(){
	passExists = $("input:password");
	if(passExists.length){
		console.log(passExists);
	

	var parentHeight = passExists.outerHeight();
		var parentWidth = passExists.outerWidth();
		var parentColor = "#ffffff";
		console.log("password field detected");

		

passExists.css({"background":"url('"+imgURL+"') "+parentColor+" right center no-repeat","background-size":passExists.outerHeight()});
		passExists.mousemove(function(e){
			var x = 

e.pageX - passExists.offset().left;
	//		var y = e.pageY - passExists.offset().top;
			if(x>parentWidth-parentHeight){
				passExists.css

("cursor","pointer");
			}else if(passExists.css("cursor")=="pointer"){
				passExists.css("cursor","");
			}
		});

		

passExists.click(function(e){
			passExists.trigger('keyup');
			var x = e.pageX - passExists.offset().left;
//			var y = e.pageY - passExists.offset().top;
	

		if(x>parentWidth-parentHeight){
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
	if(document.forms.length>0){
	

	checkPasswords();
	}
});

checkPasswords();