var Map = require('ti.map');
var TSA = new (require('model/tsa.adapter'))();
var LoadingBar = require('com.rkam.swiperefreshlayout');
var Overlays = {};
module.exports = function() {
	var $ = Ti.UI.createWindow();
	
	if (require('gms.test')()) {
		
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
		$.container= LoadingBar.createSwipeRefresh({
			view :$.mapView
		});
		//$.container.setRefreshing(true);
		$.add($.container);
		$.mapView.addEventListener('click', function(_e) {
			Ti.Media.createAudioPlayer({
				url : _e.annotation.itemId
			}).play();
		});
	}
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
			Overlays[classname].addEventListener('start',function(){
				$.container.setRefreshing(true);
			});
			Overlays[classname].addEventListener('complete',function(){
				$.container.setRefreshing(false);
			});
		});
	});
	return $;
};
