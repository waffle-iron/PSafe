var imgURL = chrome.extension.getURL("icon.png");
var passExists = null;
var formids = [];
var passids = [];

/*generate unique id for fields that dont have an id */
$.fn.uniqueId = function() {
	var id = null;
	if(!this.attr('id')){
		id = "uid-"+(Math.floor(Math.random()*26)+jQuery.now());
		this.attr('id', id);
	}else{
		id = this.attr('id');
	}
	return id;
}

/* Check for password fields in forms and add extension */
function checkPasswords() {
	passExists = $("input:password");
	if (passExists.length) {
		passExists.each(function(){
			var pHeight = $(this).outerHeight();
			var pWidth = $(this).outerWidth();
			var id = $(this).uniqueId();
			//add in logo
			$(this).css("background","url('" + imgURL + "') ");
			$(this).css("background-position","right center");
			$(this).css("background-repeat","no-repeat");
			$(this).css("background-size",pHeight);

			if($.inArray(id,passids)<0){
				/*Password mouse move listener for cursor */
				$(this).mousemove(function(e) {
					var x = e.pageX - $(this).offset().left;
					if (x > pWidth - pHeight) {
						$(this).css("cursor", "pointer");
					} else if ($(this).css("cursor") == "pointer") {
						$(this).css("cursor", "");
					}
				});
				/*Password button click listener */
				$(this).click(function(e) {
					var x = e.pageX - $(this).offset().left;
					if (x > pWidth - pHeight) {
						chrome.extension.sendMessage({
							type: "logoPress"
						});
					}
				});
			}
		});

	}
}
/*check page for form elements */
function checkForm() {
	if ($("form").length > 0) {
		/*Form submission listener */
		$("form").each(function(){
			var id = $(this).uniqueId();
			if($.inArray(id,formids)<0){
				formids.push(id);
				$(this).submit(function() {
					var user = $("input[name*='user']").val();
					var pass = $("input[name*='pass']").val();
					alert("Captured user="+user+" pass="+pass);
				});
			}
		});
		return true;
	}
	return false;
}
/*check passwords if form exists */
if (checkForm()) {
	checkPasswords();
}

/* LISTENERS */

/* Background page listeners */

/* Fill in password input field */
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
	passExists.focus()
	passExists.val(msg.action);
	passExists.keypress();
	passExists.change();
	passExists.keydown();
	passExists.keyup();
});

$(document).click(function(e) {
	if (checkForm()) {
		checkPasswords();
	}
});