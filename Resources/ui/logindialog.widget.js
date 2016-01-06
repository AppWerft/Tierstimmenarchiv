var GLOBALS = require('GLOBALS');

var L = function(key) {
	var Model = new (require('adapter/model'))();
	return Model.L(key);
};

function showEmailDialog() {
	var $ = Ti.UI.createAlertDialog({
		androidView : GLOBALS.isAndroid ? Ti.UI.createTextField({
			hintText : L('PRINT_EMAIL_HINT'),
			value : Ti.App.Properties.hasProperty('PRINT_MAIL') ? Ti.App.Properties.getString('PRINT_MAIL') : undefined
		}) : undefined,
		style : GLOBALS.isAndroid ? undefined : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
		title : L('PRINT_EMAIL_TITLE'),
		keyboardType: Titanium.UI.KEYBOARD_EMAIL,
		buttonNames : ['Cancel','OK'],
		placeholder : Ti.App.Properties.hasProperty('PRINT_MAIL') ? Ti.App.Properties.getString('PRINT_MAIL') : undefined,
		message : L('PRINT_EMAIL_MSG')
	});
	$.show();
	$.addEventListener('click', function(e) {
		console.log(e.index);
		if (e.index== 1) {
			var email = (GLOBALS.isAndroid ? $.androidView.getValue() : e.text);
			if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
				Ti.App.Properties.setString('PRINT_MAIL', email);
				require('adapter/mail4print.adapter')(email, function() {
				}, function() {
					alert(L('PRINT_EMAIL_OFFLINE'));
				});
			} else {
				alert(L('PRINT_EMAIL_NOVALIDEMAIL'));
			}
		} 
	});
}


module.exports = function() {
   showEmailDialog();

};
