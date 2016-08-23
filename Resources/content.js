var imgURL = chrome.extension.getURL("icon.png");
var passExists = null;

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
					type: "initiate",
					data: {
						myProperty: "Hello"
					}
				});
			}
		});
	}
}
/*check page for form elements */
function checkForm() {
	if ($("form").length > 0) {
		$("form").submit(function() {
			var user = $("input[name*='user']").val();
			var pass = $("input[name*='pass']").val();
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