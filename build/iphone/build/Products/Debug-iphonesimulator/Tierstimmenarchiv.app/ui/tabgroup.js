Ti.UI.backgroundColor = COLOR.BROWN;
module.exports = function() {
	var self = Ti.UI.createTabGroup({
		fullscreen : false,
		swipeable : true,
		backgroundColor : COLOR.DARKGRREEN,
		backgroundSelectedColor : COLOR.BROWN,
		activeTabIconTint : COLOR.BROWN,
		smoothScrollOnTabClick : false,
		tintColor : COLOR.BROWN,
		theme : 'Theme.WithActionBar',
		tabs : [Ti.UI.createTab({
			window : require('ui/search.window')(),
			title : 'Suche',
			backgroundColor : '#092B55',
			icon : '/assets/magnify.png'
		}), Ti.UI.createTab({
			window : require('ui/taxonomy.window')(),
			title : 'Taxonomie',
			icon : '/assets/orgchart.png',
			backgroundColor : '#092B55'
		}), Ti.UI.createTab({
			window : require('ui/map.window')(),
			title : 'Karte',
			icon : '/assets/map.png',
			backgroundColor : '#092B55'
		})]
	});

	self.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			function onCloseFn() {
				$.close();
			};
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Naturkundemuseum Berlin');
			АктйонБар.displayUseLogoEnabled = false;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			_event.source.getActivity().actionBar.displayHomeAsUp = false;
			var activity = _event.source.getActivity();
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
		}
	});
	self.activeTab = 1;
	return self;
};
