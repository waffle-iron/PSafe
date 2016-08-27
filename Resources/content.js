var imgURL = chrome.extension.getURL("icon.png");
var passExists = null;
var formids = [];

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
		var parentHeight = passExists.outerHeight();
		var parentWidth = passExists.outerWidth();
		var parentColor = "#ffffff";
		passExists.css({
			"background": "url('" + imgURL + "') " + parentColor + " right center no-repeat",
			"background-size": passExists.outerHeight()
		});
		/*Password mouse move listener for cursor */
		passExists.mousemove(function(e) {
			var x = e.pageX - passExists.offset().left;
			if (x > parentWidth - parentHeight) {
				passExists.css("cursor", "pointer");
			} else if (passExists.css("cursor") == "pointer") {
				passExists.css("cursor", "");
			}
		});
		/*Password button click listener */
		passExists.click(function(e) {
			var x = e.pageX - passExists.offset().left;
			if (x > parentWidth - parentHeight) {
				chrome.extension.sendMessage({
					type: "logoPress"
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