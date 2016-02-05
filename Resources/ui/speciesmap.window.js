var Map = require('ti.map');
var TSA = new (require('model/tsa.adapter'))();
var АктйонБар;

module.exports = function(_record) {
	var $ = Ti.UI.createWindow();
	if (require('gms.test')()) {
		$.mapView = Map.createView({
			region : {
				latitude : 0,
				longitude : 0,
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
		$.add($.mapView);
		$.mapView.addEventListener('complete', function() {
			var res = TSA.getRecordsBySpeciesWithLatLng(_record.species);
			$.mapView.setLocation(res.region);
			console.log('††††††††††††††††††††††††††††††††††††');
			console.log(_record.species);
			$.mapView.addAnnotations(res.records.map(function(point) {
				console.log(point.latitude + '    ' + point.longitude);
				return Map.createAnnotation(point);
			}));
			АктйонБар && АктйонБар.setSubtitle(res.records.length + ' Aufnahmen');
		});
	}
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			АктйонБар = require('com.alcoapps.actionbarextras');
			АктйонБар.setTitle(_record.species);
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Alle Aufnahmen');
			АктйонБар.displayUseLogoEnabled = false;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
			_event.source.getActivity().actionBar.displayHomeAsUp = true;
			var activity = _event.source.getActivity();
			activity.actionBar.onHomeIconItemSelected = function() {
				$.close();
			};
		}
	});
	return $;
};
