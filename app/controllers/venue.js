var args = arguments[0] || {};
$.maptext.text = Alloy.CFG.venueAddress;
$.phonetext.text = Alloy.CFG.venuePhoneNumber;

function clickmap(evt) {
	Ti.Platform.canOpenURL('https://maps.google.com/maps?q=' + encodeURIComponent(Alloy.CFG.venueAddress));
	
}

function clickcall(evt){
	if (OS_IOS){
		if (Ti.Platform.canOpenURL('tel://' + Alloy.CFG.venuePhoneNumber)){
			Ti.Platform.canOpenURL('tel://' + Alloy.CFG.venuePhoneNumber);
		}else{
			alert(L('no_phone'));
		}
	}else {
		Ti.Platform.canOpenURL('tel://' + Alloy.CFG.venuePhoneNumber);
	}
}
