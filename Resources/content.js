var imgURL = chrome.extension.getURL("icon.png");
var formids = [];
var passids = [];
var passFields = new Array();

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
	//find password related text inputs
	$("input:password").each(function(){
		var uid = $(this).uniqueId();
		var data = passFields.find( function( field ) { 
		    return field.key === uid;
		} );
		if(!data){
			passFields.push({key:uid, value:$(this)});
		}
	});
	$("input:text[name*='pass']").each(function(){
		var uid = $(this).uniqueId();
		var data = passFields.find( function( field ) { 
		    return field.key === uid;
		} );
		if(!data){
			passFields.push({key:uid, value:$(this)});
		}
	});
	$("[id*='pass']").each(function(){
		var uid = $(this).uniqueId();
		var data = passFields.find( function( field ) { 
		    return field.key === uid;
		} );
		if(!data){
			if($(this).tagName== "INPUT"){
				passFields.push({key:uid, value:$(this)});
			}
		}
	});
	if (passFields.length) {
		$.each(passFields,function(key, value){
			var field = value.value;
			var pHeight = field.outerHeight();
			var pWidth = field.outerWidth();
			var id = field.uniqueId();
			//add in logo
			field.css("background","url('" + imgURL + "') ");
			field.css("background-position","right center");
			field.css("background-repeat","no-repeat");
			field.css("background-size",pHeight);

			if($.inArray(id,passids)<0){
				/*Password mouse move listener for cursor */
				field.mousemove(function(e) {
					var x = e.pageX - field.offset().left;
					if (x > pWidth - pHeight) {
						field.css("cursor", "pointer");
					} else if (field.css("cursor") == "pointer") {
						field.css("cursor", "");
					}
				});
				/*Password button click listener */
				field.click(function(e) {
					var x = e.pageX - field.offset().left;
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
function checks(){
	if (checkForm()) {
		checkPasswords();
	}
}

checks();
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

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (typeof mutation.addedNodes == "object") {
        	var jq = $(mutation.addedNodes).find("input");
        	if(jq.length > 0){
        		checks();
        	}
        }
    });
});
var config = {
    "childList": true, 
    "subtree": true
};
observer.observe(document.body, config);