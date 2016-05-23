module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var TSA = new (require('model/tsa.adapter'))();

	var WheelModule = require('de.appwerft.fortunewheelview');
	var wheelView = WheelModule.createWheelView({
		icons : ["amphibia", "aves", "insecta", "mammalia", "reptilia"].map(function(icon) {
			return Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "assets", icon + '.png').nativePath;
		}),
		width : 700,
		height : 700,
		borderWidth : 0,
		borderColor : 'silver',
		bottom : -250

	});
	wheelView.addEventListener('change', function(_e) {

	});
	var titleView = Ti.UI.createLabel({
		text : 'Amphibia',
		top : 150,
		zIndex : 9999,
		height : Ti.UI.SIZE,
		color : COLOR.DARKGREEN,
		font : {
			fontSize : 32,
			fontWeight : 'bold'
		}
	});
	$.add(wheelView);
	$.add(titleView);
	return $;
};
