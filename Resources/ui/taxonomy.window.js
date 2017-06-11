var lastindex = 5;
var WheelModule = require('de.appwerft.fortunewheelview');

module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var TSA = new (require('model/tsa.adapter'))();
	var Classes = TSA.getAllClasses().map(function(c) {
		return c;
	});

	function onBlur() {
		
	}

	function onOpen() {
		$.removeAllChildren();
		$.titleView = Ti.UI.createLabel({
			text : Classes[0].latin,
			top : 150,
			height : 100,
			touchEnabled : false,
			color : COLOR.DARKGREEN,
			font : {
				fontSize : 32,
				fontWeight : 'bold'
			}
		});

		$.wheelView = WheelModule.createWheelView({
			images : Classes.map(function(Class) {
				return Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, Class.image).nativePath;
			}),
			options : {
				unselectScaleOffset : 1.0,
				distanceScale : 1.0,
				selectScaleOffset : 1.1,
				centripetalPercent : 0.25,
				flingable : true,
				frameRate : 40,
				friction : 5,
				grooves : true,
				minimumSize : 0.1,
				notch : 90,
				spinSensitivity : 2,
				velocityClamp : 10,
				selectedIndex : lastindex
			},
			width : 800,
			height : 900,
			bottom : -300
		});
		$.wheelView.setSelectedIndex(5);
		$.wheelView.addEventListener('groovechanged', function(_e) {
			var index = _e.index;
			lastindex = index;
			$.titleView.text = Classes[index].latin;
		});
		$.wheelView.addEventListener('grooveselected', function(_e) {
			var lastindex = _e.index;
			Ti.App.Properties.setInt("LASTINDEX", lastindex);
			require('ui/orders.window')(Classes[lastindex].latin).open();
		});
		$.add($.titleView);
		$.add($.wheelView);
	}

$.addEventListener("open", onOpen);

	$.addEventListener("blur", onBlur);

	return $;
};
