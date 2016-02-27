var TSA = new (require('model/tsa.adapter'))();

var TiPermission = require('ti.permissions');

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
	$.add(Canvas.createView());

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


	$.addEventListener('close', function(_event) {
		// TODO clearCron
		audioRecorder && audioRecorder.stopRecording();
		Canvas = null;
	});
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Aufnahme');
			АктйонБар.displayUseLogoEnabled = !1;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
			var activity = _event.source.getActivity();
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function() {
				$.close();
			};
		}
		require('ti.permissions').requestPermissions(['android.permission.RECORD_AUDIO', 'android.permission.WRITE_EXTERNAL_STORAGE'], function(e) {
			console.log(e);
			e.success && startRecorder();
			e.success || alert('Sie müssen für die Aufnahmefunktion zustimmen.');
		});
	});
	return $;
};

