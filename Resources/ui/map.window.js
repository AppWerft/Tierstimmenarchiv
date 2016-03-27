var Map = require('ti.map');
var TSA = new (require('model/tsa.adapter'))();

var Overlays = {};

module.exports = function() {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	//if (require('gms.test')()) {
	$.mapView = Map.createView({
		region : {
			latitude : 43,
			longitude : 10,
			latitudeDelta : 50,
			longitudeDelta : 50
		},
		mapType : Map.TERRAIN_TYPE,
		enableZoomControls : false,
		compassEnabled : false,
		userLocation : false,
		userLocationButton : false,
		mapToolbarEnabled : false
	});
	$.mapView.addEventListener('click', function(_e) {
		Ti.Media.createAudioPlayer({
			url : _e.annotation.itemId
		}).play();
	});
	//}
	$.addEventListener('focus', function(_event) {
		var MarkerManager = require('ti.markermanager');
		if (Overlays == {})
			return;
		var records = TSA.getRecordsWithLatLng();
		Object.getOwnPropertyNames(records).forEach(function(classname) {
			Overlays[classname] = new MarkerManager({
				name : classname,
				maxannotations : 50,
				points : records[classname],
				map : $.mapView
			});
			Overlays[classname].addEventListener('start', function() {
				
			});
			Overlays[classname].addEventListener('complete', function() {
				
			});
		});
	});
	$.add($.mapView);
	return $;
};
