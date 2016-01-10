var Map = require('ti.map');
module.exports = function(id) {

	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	$.mapView = Map.createView({
		region : {
				latitude : 43,
				longitude : 10,
				latitudeDelta : 30,
				longitudeDelta : 30
			},
			mapType : Map.TERRAIN_TYPE,
			enableZoomControls : false,
			compassEnabled : false,
			userLocation : false,
			userLocationButton : false,
			
	});
	$.add(mapView);
	var TSA = new (require('model/tsa.adapter'))();
	$.addEventListener('focus', function(_event) {
		var records = TSA.getRecordsWithLatLng();
	});
	return $;
};
