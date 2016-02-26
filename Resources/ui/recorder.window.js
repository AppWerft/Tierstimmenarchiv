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
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	$.addEventListener('focus', function() {
		var audioRecorder,
		    cron;
		var Canvas = new CanvasModule();

		$.add(Canvas.createView());

		if (TiPermission.hasPermission('android.permission.RECORD_AUDIO') == !0) {
			startRecorder();
		} else {
			TiPermission.requestPermission('android.permission.RECORD_AUDIO', 123, function(e) {
				if (e.requestCode == 123 && e.success == !0) {
					startRecorder();
				} else {
					
				}
			});
		}
		function startRecorder() {
			function startRecorderWithPermission() {
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
			if (TiPermission.hasPermission('android.permission.WRITE_EXTERNAL_STORAGE') == !0) {
				startRecorderWithPermission();
			} else {
				TiPermission.requestPermission('android.permission.WRITE_EXTERNAL_STORAGE', 122, function(e) {
					if (e.requestCode == 122 && e.success == !0) {
						startRecorderWithPermission();
					}
				});
			}

		}

		function getLevel() {
			if (audioRecorder && audioRecorder.isRecording() && Canvas) {
				var level = audioRecorder.getMaxAmplitude() / 20000;
				console.log(Math.log10(level * 6000));
				Canvas.drawLevel(level);

			}
		}

		/*
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
		 activity.actionBar.onHomeIconItemSelected = function() {
		 $.close();
		 };
		 }
		 });*/
	});
	return $;
};

