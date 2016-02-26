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
	$.addEventListener('open', require('ui/tabgroup.actionbar'));
	$.open();
};
