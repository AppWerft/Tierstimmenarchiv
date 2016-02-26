module.exports = function(_event) {
	if (Ti.Platform.osname == 'android') {
		var АктйонБар = require('com.alcoapps.actionbarextras');
		АктйонБар.setTitle('Tierstimmenarchiv');
		АктйонБар.setFont('Helvetica-Bold');
		АктйонБар.setSubtitle('des Museums für Naturkunde Berlin');
		АктйонБар.displayUseLogoEnabled = false;
		АктйонБар.setStatusbarColor(COLOR.BROWN);
		АктйонБар.backgroundColor = COLOR.DARKGREEN;
		var activity = _event.source.getActivity();
		if (activity) {
			activity.onCreateOptionsMenu = function(_menuevent) {
				_menuevent.menu.clear();
				console.log(_menuevent.menu.apiName);
			//	return;
				var item = _menuevent.menu.add({
					title : 'Aufnahme',
				//	showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
				//	icon : Ti.App.Android.R.drawable.ic_action_mic
				});
				/*item.addEventListener("click", function(_e) {
					require('ui/recorder.window')().open();
				});*/
			};
			activity.invalidateOptionsMenu();
		}
	}
}; 