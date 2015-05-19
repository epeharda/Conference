var Codebird = require("codebird");
var cb = new Codebird();
var getFeed = function (args){
	switch (args.type){
		case 'TWITTER':
			cb.setConsumerKey(args.consumerKey, args.consumerSecret);
			var bearerToken = Ti.App.Properties.getString('TwitterBearerToken', null);
			if(bearerToken == null){
				cb.__call(
					'oauth2_token', 
					{},
					function(reply){
						var bearer_token=reply.access_token;
						cb.setBearerToken(bearer_token);
						Ti.App.Properties.setString('TwitterBearerToken', bearer_token);
						fetchTwitter(args.action, args.searchstring, args.max, args.success);
					}
				);
			}else{
				cb.setBearerToken(bearerToken);
				fetchTwitter(args.action, args.searchstring, args.max, args.success);
			}
			break;
	}
};

function fetchTwitter(action, searchstring, max, success){
	var params = {
		q:Ti.Network.encodeURIComponent(searchstring), 
		count: max,
	};
	cb.__call(
		action,
		params,
		function(reply) {
			success(JSON.stringify(reply.statuses));
		},
		true //required parameter
	);
}

exports.getFeed=getFeed;
