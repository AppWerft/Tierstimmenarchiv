var TSA = new (require('model/tsa.adapter'))();

var TiPermissions = require('ti.permissions');

var CanvasModule = require('ui/leveldisplay.widget');
var TICK = 50;
var MAXDURATION = 60000;

Math.log10 = Math.log10 ||
function(x) {
	return Math.log(x) / Math.LN10;
};

module.exports = function(_parent) {
	var audioRecorder,
	    cron;
	var $ = Ti.UI.createWindow({
		theme : "Theme.AudioRecorder",
		fullscreen : true,
		backgroundColor : "#a000"
	});

	$.container = Ti.UI.createView({
		backgroundColor : "white",
		width : "90%",
		height : "90%"
	});
	$.add($.container);
	var Spectrum = require("ti.spectrumanalyzer");
	var spectrumView = Spectrum.createView({
		width : Ti.UI.FILL,
		bottom : 100,
		top : 0,
		color : "green",
		borderWidth : 1,
		borderColor : "gray",
		borderRadius : 5,
		backgroundColor : "#eee"
	});

	function onBlurFn(_event) {
		//	console.log("TiSpec  onBlurFn");
		//	spectrumView.stop();
	}

	function onFocusFn(_event) {
		require('vendor/permissions').requestPermissions(['RECORD_AUDIO', 'WRITE_EXTERNAL_STORAGE'], function(_success) {
			if (_success) {
				setTimeout(function() {
					spectrumView.start();
				}, 2000);
				$.container.add(spectrumView);
			} else
				alert('Sie müssen für die Aufnahmefunktion der Aufnahmeberechtigung zustimmen.');
		});
	}


	$.addEventListener('blur', onBlurFn);
	$.addEventListener('open', onFocusFn);
	return $;
};

