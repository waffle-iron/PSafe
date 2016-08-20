var myNotificationID = null;
var opt1 = {
   type: "basic",
   title: "PSafe",
   message: "",
   iconUrl: "icon.png",
   eventTime: Date.now()+10000,
   isClickable: false,
   buttons: null

};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "initiate":
        	opt1.message = "No password exists for this domain, would you like to generate a password?";
        	opt1.buttons =    [{
               title: "Yes, Generate password",
           }];
            chrome.notifications.create("popup", opt1, function(id) {
            				   if(chrome.runtime.lastError) {
            				     console.error(chrome.runtime.lastError.message);
            				   }
            				   myNotificationID=id;
            });
        break;
    }
    return true;
});
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
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === myNotificationID) {
        if (btnIdx === 0) {
        	var pass = generatePassword();
        	opt1.message = "Password Generated:\n"+pass;
        	opt1.buttons = null;
            chrome.notifications.create("popup", opt1, function(id){
            	if(chrome.runtime.lastError){
            		console.error(chrome.runtime.lastError.message);
            	}
            	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            	    chrome.tabs.sendMessage(tabs[0].id, {action: pass}, function(response) {});  
            	});
            });
        } 
    }
});