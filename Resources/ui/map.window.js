var Map = require('ti.map');
var TSA = new (require('model/tsa.adapter'))();
var Overlay;
module.exports = function() {
	var $ = Ti.UI.createWindow();
	if (require('gms.test')()) {
		$.mapView = Map.createView({
			region : {
				latitude : 13,
				longitude : 10,
				latitudeDelta : 130,
				longitudeDelta : 130
			},
			mapType : Map.TERRAIN_TYPE,
			enableZoomControls : false,
			compassEnabled : false,
			userLocation : false,
			userLocationButton : false,
		});
		$.add($.mapView);
		$.mapView.addEventListener('click', function(_e) {
			Ti.Media.createAudioPlayer({
				url : _e.annotation.itemId
			}).play();
		});
	}
	$.addEventListener('focus', function(_event) {
		
		if (Overlay) return;
			Overlay = new (require('ti.markermanager'))({
				name : 'TSA',
				points : TSA.getRecordsWithLatLng(),
				map : $.mapView
			});
	});
	return $;
};
