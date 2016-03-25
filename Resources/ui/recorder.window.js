var TSA = new (require('model/tsa.adapter'))();

var TiPermissions = require('ti.permissions');

var CanvasModule = require('ui/leveldisplay.widget');
var TICK = 50;
var MAXDURATION = 60000;

Math.log10 = Math.log10 ||
function(x) {
	return Math.log(x) / Math.LN10;
};

module.exports = function() {
	var audioRecorder,
	    cron;
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var Canvas = new CanvasModule();
	var canvasView = Canvas.createView();
	canvasView.top = BIGTOP;
	$.add(canvasView);

	function startRecorder() {
		function onGetLevelFn() {
			if (audioRecorder && audioRecorder.isRecording() && Canvas) {
				var level = audioRecorder.getMaxAmplitude() / 20000;
				Canvas.drawLevel(level);
			}
		}

		audioRecorder = require('titutorial.audiorecorder');
		audioRecorder.startRecording({
			outputFormat : audioRecorder.OutputFormat_MPEG_4,
			audioEncoder : audioRecorder.AudioEncoder_AAC,
			directoryName : "recordings",
			maxDuration : MAXDURATION,
			success : function(e) {
				clearInterval(cron);
			},
			error : function(e) {
			}
		});
		cron = setInterval(onGetLevelFn, TICK);
	}

	function onCloseFn(_event) {
		// TODO clearCron
		audioRecorder && audioRecorder.stopRecording();
		Canvas = null;
	}


	$.addEventListener('close', onCloseFn);
	$.addEventListener('focus', function(_event) {
		require('vendor/permissions').requestPermissions(['RECORD_AUDIO', 'WRITE_EXTERNAL_STORAGE'], function(_success) {
			_success && startRecorder();
			_success || alert('Sie müssen für die Aufnahmefunktion zustimmen.');
		});
	});
	return $;
};

