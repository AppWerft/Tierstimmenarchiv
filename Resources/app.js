const COLOR = {
	LIGHTGREEN : '#D5E3CB',
	DARKGREEN : '#174122',
	BROWN : '#B87C25'
};

var $ = require('ui/search.window')();

var FrogSounds = require('model/frogsounds.adapter');

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

