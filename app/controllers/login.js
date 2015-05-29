
//create instance of user model
var user = Alloy.createModel('user');


//focus shifts to password after user hits enter when done typing username
function focusPassword() {
	$.password.focus();
}

//logs in user
function loginUser(evt){
	
	Ti.API.info (JSON.stringify(user));
	//call the extended model's function
	if (user.login($.email.value, $.password.value)){
		Ti.API.info("pw:  " + passKeychainItem.valueData);
	}


}

//$.login.open();
