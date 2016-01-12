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
			title : 'Suche',
			backgroundColor : '#092B55',
			icon : '/assets/magnify.png'
		}), Ti.UI.createTab({
			title : 'Taxonomie',
			window: require('ui/taxonomy.window')(),
			icon : '/assets/orgchart.png',
			backgroundColor : '#092B55'
		}), Ti.UI.createTab({
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
		self.tabs[0].window = require('ui/search.window')();
		self.tabs[2].window = require('ui/map.window')();
	});
	self.activeTab = 1;
	self.open();
};
