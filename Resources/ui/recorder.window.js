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

	function requestPermissions() {
		TiPermission.requestPermission('android.permission.RECORD_AUDIO', 1, function(e) {
			console.log(e);
			if (e.requestCode == 1 && e.success == !0) {
				TiPermission.requestPermission('android.permission.WRITE_EXTERNAL_STORAGE', 2, function(e) {
					if (e.requestCode == 2 && e.success == !0) {
						startRecorderWithPermission();
					}
				});
			}
		});
	}

	function startRecorderWithPermission() {
		Ti.UI.createNotification({
			message : 'Alle Genehmigungen (Aufnahme vom Mikrofon und Abspeichern auf der SD-Karte) sind erteilt.'
		}).show();

		function getLevel() {
			if (audioRecorder && audioRecorder.isRecording() && Canvas) {
				var level = audioRecorder.getMaxAmplitude() / 20000;
				Canvas.drawLevel(level);

			}
		}

		audioRecorder = require('titutorial.audiorecorder');
		cron = setInterval(getLevel, TICK);
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
		requestPermissions();
	});

	return $;
};

