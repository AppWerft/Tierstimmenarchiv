Ti.UI.backgroundColor = COLOR.BROWN;

module.exports = function() {
	var $ = Ti.UI.createTabGroup({
		fullscreen : false,
		swipeable : true,
		backgroundColor : COLOR.DARKGRREEN,
		backgroundSelectedColor : COLOR.BROWN,
		activeTabIconTint : COLOR.BROWN,
		smoothScrollOnTabClick : false,
		tintColor : COLOR.BROWN,
		theme : 'Theme.WithActionBar',
		tabs : [Ti.UI.createTab({
			title : 'Suche',
			backgroundColor : '#092B55',
			window : require('ui/search.window')()
		}), Ti.UI.createTab({
			title : 'Taxonomie',
			window : require('ui/taxonomy.window')(),
			backgroundColor : '#092B55'
		}),Ti.UI.createTab({
			title : 'Karte',
			window : require('ui/map.window')(),
			backgroundColor : '#092B55'
		})],
		activeTab : 1
	});
	$.addEventListener('open', function(_event) {
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
					return;
					var item = _menuevent.menu.add({
						title : 'Aufnahme',
						showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
						icon : Ti.App.Android.R.drawable.ic_action_mic
					});
					item.addEventListener("click", function(_e) {
						require('ui/recorder.window')().open();
					});
				};
				activity.invalidateOptionsMenu();
			}
		}
	});

	$.open();
};
