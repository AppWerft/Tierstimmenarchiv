
var $ = require('ui/search.window')();
$.addEventListener("android:back", function(_e) {
	_e.cancelBubble = true;
	var intent = Ti.Android.createIntent({
		action : Ti.Android.ACTION_MAIN,
		flags : Ti.Android.FLAG_ACTIVITY_NEW_TASK
	});
	intent.addCategory(Ti.Android.CATEGORY_HOME);
	Ti.Android.currentActivity.startActivity(intent);
	return false;
});
$.open();

