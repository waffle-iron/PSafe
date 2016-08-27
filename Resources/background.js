
//basic popup window
var window1 = {
	type: "basic",
	title: "PSafe",
	message: "",
	iconUrl: "icon.png",
	eventTime: Date.now()+10000,
	isClickable: false,
	buttons: null

};

/*generate password */
function generatePassword(){
	var str = "";
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890!@#$%^&*()_-+=.,[]{}`~";
	var strLength = 20;
	for(i = 0; i < strLength; i++){
		var rnum = Math.floor(Math.random() * chars.length);
		str += chars.substring(rnum,rnum+1);
	}
	return str;
}

/* logopress message listener */
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.type) {
		case "logoPress":
		window1.message = "No password exists for this domain, would you like to generate a password?";
		window1.buttons =    [{
			title: "Yes, Generate password",
		}];
		chrome.notifications.create("popup", window1, function(id) {
			if(chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError.message);
			}

			/* Button press listener */
			chrome.notifications.onButtonClicked.addListener(function(id, btnIdx) {
				if (btnIdx === 0) {
					var pass = generatePassword();
					window1.message = "Password Generated:\n"+pass;
					window1.buttons = null;
					chrome.notifications.create("popup", window1, function(id){
						if(chrome.runtime.lastError){
							console.error(chrome.runtime.lastError.message);
						}
						chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
							chrome.tabs.sendMessage(tabs[0].id, {action: pass}, function(response) {});  
						});
					});
				}

			});
		});
		break;
	}
	return true;
});
