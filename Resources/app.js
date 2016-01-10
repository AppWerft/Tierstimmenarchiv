const COLOR = {
	LIGHTGREEN : '#D5E3CB',
	DARKGREEN : '#174122',
	BROWN : '#B87C25'
};
var logo = Ti.UI.createImageView({
	image : '/assets/foxes.png',
	top : '20%',
	transform : Ti.UI.create2DMatrix({
		scale : 0.01
	}),
	width : Ti.UI.FILL,
	height : 'auto'
});
var $ = Ti.UI.createWindow({
	fullscreen : false,
	theme : "Theme.WithActionBar",
	title : 'Tierstimmenarchiv',
	backgroundColor : Ti.Android ? 'transparent' : 'white',
	/*rightNavButtons : [Ti.UI.createButton({
	 title : 'Karte'
	 }), Ti.UI.createButton({
	 title : 'Taxo'
	 })]*/
});

var TSA = new (require('model/tsa.adapter'))();
if (TSA.Import_isDone()) {
	var tabgroup = require('ui/tabgroup')();
	tabgroup.open();
} else {
	TSA.Import_Init();
	TSA.Import_loadTaxo();
	setTimeout(function() {
		TSA.Import_loadRecords();
	}, 1000);
	require('ui/tabgroup')().open();

}

