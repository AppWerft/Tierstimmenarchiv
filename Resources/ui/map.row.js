var Map = require('ti.map');
const DELTA = 0.03;

module.exports = function(_record) {
	var $ = Ti.UI.createTableViewRow({
		height : 270
	});
	$.container = Ti.UI.createView();
	$.add($.container);
	if (require('gms.test')()) {
		$.mapView = Map.createView({
			region : {
				latitude : _record.latitude,
				longitude : _record.longitude,
				latitudeDelta : 10,
				longitudeDelta : 10
			},
			mapType : Map.HYBRID_TYPE,
			enableZoomControls : false,
			compassEnabled : false,
			userLocation : false,
			userLocationButton : false,
			mapToolbarEnabled : false
		});
		$.container.add($.mapView);
		console.log(_record);
		if (_record.latitude && _record.longitude) {
			$.annotationView = Map.createAnnotation({
				latitude : _record.latitude - DELTA / 4,
				longitude : _record.longitude,
				title : _record.species,
				image : '/assets' + _record.classes_latin + '.png',
				subtitle : _record.Beschreibung

			});
			$.mapView.addAnnotation($.annotationView);
		}
		$.mapView.addEventListener('complete', function() {
			$.mapView.setLocation({
				latitude : _record.latitude,
				longitude : _record.longitude,
				latitudeDelta : DELTA,
				longitudeDelta : DELTA,
				animate : true
			});
			$.mapView.selectAnnotation($.annotationView);
			$.container.add(Ti.UI.createButton({
				top : 5,
				right : 5,
				width : 44,
				height : 44,
				backgroundImage : '/assets/all.png'
			}));
			$.container.children[1].addEventListener('click', function() {
				require('ui/speciesmap.window')(_record).open();
			});
		});

	}
	$.addEventListener('blur', function() {
		console.log('MAPROW CLOSED √√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√√');
	});
	return $;
};
