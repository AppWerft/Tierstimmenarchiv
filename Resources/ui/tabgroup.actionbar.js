module.exports = function(_event) {
	if (Ti.Platform.osname == 'android') {
		var АБ = require('com.alcoapps.actionbarextras');
		АБ.setTitle('Tierstimmenarchiv');
		АБ.setFont('Helvetica-Bold');
		АБ.setSubtitle('des Museums für Naturkunde Berlin');
		АБ.setStatusbarColor(COLOR.BROWN);
		АБ.backgroundColor = COLOR.DARKGREEN;
		var activity = _event.source.getActivity();
		if (activity) {
			activity.onCreateOptionsMenu = function(_menuevent) {
				_menuevent.menu.clear();
				/*var item = _menuevent.menu.add({
					title : 'Aufnahme',
					showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
					icon : Ti.App.Android.R.drawable.ic_action_mic
				});
				item.addEventListener("click", function(_e) {
					require('ui/recorder.window')().open();
				});*/

			};
			activity.invalidateOptionsMenu();
		}
	}
};
