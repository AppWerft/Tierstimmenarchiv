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
		tabs : [],
		activeTab : 1
	});
	$.addTab(Ti.UI.createTab({
		title : 'Suche',
		backgroundColor : '#092B55',
		window : require('ui/search.window')()
	}));
	$.addTab(Ti.UI.createTab({
		title : 'Taxonomie',
		window : require('ui/taxonomy.window')(),
		backgroundColor : '#092B55'
	}));
	$.addTab(Ti.UI.createTab({
		title : 'Karte',
		window : require('ui/map.window')(),
		backgroundColor : '#092B55'
	}));
	$.addTab(Ti.UI.createTab({
		title : 'Aufnahme(n)',
		window : require('ui/recorder.window')(),
		backgroundColor : '#092B55'
	}));
	$.addEventListener('open', require('ui/tabgroup.actionbar'));

	$.open();
};
