var ZoomImage = require('com.gbaldera.titouchgallery');
var TSA = new (require('model/tsa.adapter'))();

module.exports = function(species) {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	console.log(TSA.getLargeImage(species));
	var largeimageurl = TSA.getLargeImage(species);
	if (largeimageurl) {
		$.zoomView = ZoomImage.createTouchGallery({
			images : [largeimageurl],
			currentPage : 0
		});
		$.add($.zoomView);
	}
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			function onCloseFn() {
				$.close();
				$ = null;
			};
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle(species + ' Zoomview');
			АктйонБар.displayUseLogoEnabled = false;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			_event.source.getActivity().actionBar.displayHomeAsUp = true;
			var activity = _event.source.getActivity();
			activity.actionBar.onHomeIconItemSelected = onCloseFn;
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
		}
		Ti.Gesture.addEventListener('orientationchange', onOrientationchangeFn);

	});
	function onOrientationchangeFn() {
		if ($ && $.activity && $.activity.actionBar) {
			if (Ti.Platform.displayCaps.platformHeight > Ti.Platform.displayCaps.platformWidth)
				$.activity.actionBar.show();
			else
				$.activity.actionBar.hide();
		}
	}
	$.addEventListener('close', function(_event) {
		Ti.Gesture.removeEventListener('orientationchange', onOrientationchangeFn);
	});
	return $;
};
