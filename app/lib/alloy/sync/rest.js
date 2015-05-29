// This sync adapter makes HTTP requests to log the user in
function S4() {
	return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}

function guid() {
	return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function InitAdapter(config) {
	return {};
}

// Global URL variable
var BASE_URL = "http://coelm2/TNdevelopment/mobile/EricaTest.nsf/HelloWorld.xsp";


// Override the Backbone.sync method with the following
function Sync(model, method, options){
	
	//var object_name = model.config.adapter.collection_name;
	//if (object_name === "user"){
		Ti.API.Info("before process user");
		processUser(model, method, options);
	//}
}
	


// Helper function for creating an HTTP request
function http_request(username, password) {
	Ti.API.Info("http_request");
	var httpClient = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        Ti.API.info("Received text on load: " + this.responseText);
	        
	        if (this.responseText.indexOf("Server Login") > -1){
	        	//$.email.value = "";
	        	//$.password.value = "";
	        	Ti.App.login="false";
	        	alert("Please enter valid credentials");
	        	//return false;
	        }else{
				//userKeychainItem.valueData = username; // username
				//passKeychainItem.valueData = password; // password
				//alert('credentials stored');
				
				
				//Ti.API.info("***************");
				//Ti.API.info("username:  " + userKeychainItem.valueData);
				//Ti.App.Username = userKeychainItem.valueData;
				//Ti.API.info("***************");
			    //Ti.API.info("pw:  " + passKeychainItem.valueData);
		       // welcomeUser();
		       Ti.App.login = true;
		        alert("login worked!");
		        //return true;
				
		       }
	    },
	    onerror: function(e) {
	        Ti.API.error("Error is: " + e.error);
	    },
	    timeout : 5000,
	});
	authstr = 'Basic ' + Titanium.Utils.base64encode(username + ':' + password);
	httpClient.open("POST","http://coelm2/TNdevelopment/mobile/EricaTestDB.nsf/HelloWorld.xsp");
	httpClient.setRequestHeader("Authorization", authstr);
	httpClient.setRequestHeader("Content-Type", "text/html; charset=utf-8");
	httpClient.send();	

};



//helper function to login the user
function processUser(model, method, opts){
	var attributes = model.toJSON();
	Ti.API.Info(attributes);
	var error;

	switch(method) {

		// This case is called by the Model.fetch and Collection.fetch methods to retrieve data.
		case 'read':
			// Use the idAttribute property in case the model ID is set to something else besides 'id'
			//if (payload[model.idAttribute]) {
				// If we have an ID, fetch only one document
			//	http_request('GET', 'http://www.leg.state.co.us/demo/iLegislate.nsf/jBill.xsp' + payload[model.idAttribute], null, callback);
			//}
			//else {
				// if not, fetch all documents
				http_request(attributes.username,attributes.password, null, callback);
			//}
			
			
			break;

		// This case is called by the Model.save and Collection.create methods
		// to a initialize model if the IDs are not set.
		case 'create':
			//if (payload.title && payload.author) {
			//	http_request('POST', BASE_URL, {title: payload.title, author: payload.author}, callback);
			//}
			//else {
			//	error = 'ERROR: Cannot create model without an author or title!';
			//}
			break;

		// This case is called by the Model.destroy method to delete the model from storage.
		case 'delete':
			//if (payload[model.idAttribute]) {
			//	http_request('DELETE', BASE_URL + payload[model.idAttribute], null, callback);
			//}
			//else {
			//	error = 'ERROR: Model does not have an ID!';
			//}
			//break;

		// This case is called by the Model.save and Collection.create methods
		// to update a model if they have IDs set.
		case 'update':
			//if (payload[model.idAttribute]) {
			//	http_request('PUT', BASE_URL + payload[model.idAttribute], {title: payload.title, author: payload.author}, callback);
			//}
			//else {
			//	error = 'ERROR: Model does not have an ID!';
			//}
			break;

		default :
			error = 'ERROR: Sync method not recognized!';
	};

	if (error) {
		options.error(model, error, options);
		Ti.API.error(error);
		model.trigger('error');
	}

	// Simple default callback function for HTTP request operations.
	function callback(success, response, error) {
		res = JSON.parse(response);
		if (success) {
			//Ti.API.info (JSON.stringify(res));
			// Calls the default Backbone success callback
			// and invokes a custom callback if options.success was defined.
			options.success(res, JSON.stringify(res), options);
			
		}
		else {
			// Calls the default Backbone error callback
			// and invokes a custom callback if options.error was defined.
			var err = res.error || error;
			Ti.API.error('ERROR: ' + err);
			options.error(model, error, options);
			model.trigger('error');
		}
	};
}


//we need underscore
var _ = require("alloy/underscore")._;

// Override the Backbone.sync method with the following
module.exports.sync = Sync;	

// Perform some actions before creating the Model class
module.exports.beforeModelCreate = function(config, name) {
	config = config || {};
	// If there is a base_url defined in the model file, use it
	if (config.adapter.base_url) {
		BASE_URL = config.adapter.base_url;
	}
	return config;
};

// Perform some actions after creating the Model class 
module.exports.afterModelCreate = function(Model, name) {
	// Nothing to do
};