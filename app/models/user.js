//module used for keychain
var keychain = require('com.obscure.keychain');

var userKeychainItem;
var passKeychainItem;

//if(!userKeychainItem && !passKeychainItem){
//	userKeychainItem = keychain.createKeychainItem('username');
//	passKeychainItem = keychain.createKeychainItem('password');
//};


exports.definition = {
	config: {

		adapter: {
			type: "rest",
			collection_name: "user",
			//endpoint URL to access the service for the REST sync adapter
			base_url: 'BASE_URL',
			

		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			
		login: function(_login, _password, _callback){
	        
	        Ti.API.info("Received");
	        
	        if (http_request(_login, _password)){
	        	userKeychainItem.valueData = _login; // username
				passKeychainItem.valueData = _password; // password
				//alert('credentials stored');
				
				
				//Ti.API.info("***************");
				//Ti.API.info("username:  " + userKeychainItem.valueData);
				Ti.App.Username = userKeychainItem.valueData;
				Ti.App.Password = passKeychainItem.valueData;
				//Ti.API.info("***************");
			    //Ti.API.info("pw:  " + passKeychainItem.valueData);
	        	return true;
	        }else{
	        	
	        	return false;
	        }
			
		},	
		
		logout: function (_callback){
			var TAP =Ti.App.Properties;
			if (TAP.hasProperty("password")){
				TAP.removeProperty("password");
				return true;
			}else{
				return false;
			}
		},
	
	});
		return Model;
	
	},
	
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};

// Helper function for creating an HTTP request
function http_request(username, password) {
	
	var httpClient = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        Ti.API.info("Received text on load: " + this.responseText);
	        
	        if (this.responseText.indexOf("Server Login") > -1){
	        	Ti.App.login=false;
	        	alert("Please enter valid credentials");
	        	return false;
	        }else{
		       Ti.App.login = true;
		       alert("login worked!");
		        return true;
				
		       }
	    },
	    onerror: function(e) {
	        Ti.API.error("Error is: " + e.error);
	    },
	    timeout : 5000,
	});
	
	authstr = 'Basic ' + Titanium.Utils.base64encode(username + ':' + password);
	
	httpClient.open("POST","http://coelm2/TNdevelopment/mobile/EricaTest.nsf/HelloWorld.xsp");
	httpClient.setRequestHeader("Authorization", authstr);
	httpClient.setRequestHeader("Content-Type", "text/html; charset=utf-8");
	httpClient.send();	

};

