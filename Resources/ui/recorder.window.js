var TSA = new (require('model/tsa.adapter'))();
var CanvasObject = require('com.wwl.canvas');

var LDF = Ti.Platform.displayCaps.logicalDensityFactor;
var CANVASHEIGHT = 320;
var MAXDURATION = 60000;
var TICK = 50;

Math.log10 = Math.log10 ||
function(x) {
	return Math.log(x) / Math.LN10;
};

var canvasready = false;

module.exports = function() {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN,
	});
	$.canvascontainer = Ti.UI.createScrollView({
		scrollType : 'horizontal',
		width : Ti.UI.FILL,
		contentWidth : 3000,
		top : 0,
		height : CANVASHEIGHT/LDF,
		contentHeight : CANVASHEIGHT / LDF
	});
	$.canvas = CanvasObject.createCanvasView({
		backgroundColor : 'black',
		top : 0,
		left : 0,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
	});
	$.canvascontainer.add($.canvas);
	$.add($.canvascontainer);
	$.canvas.addEventListener('load', function() {
		$.canvas.lineWidth = LDF;
		/* time grid: */
		for (var i = 0; i < MAXDURATION; i++) {
			if (i % (10000 / TICK) == 0) {
				$.canvas.strokeStyle = '#555555';
				$.canvas.beginPath();
				$.canvas.moveTo(i, CANVASHEIGHT);
				$.canvas.lineTo(i, 0);
				$.canvas.closePath();
				$.canvas.stroke();

			}
		}
		$.canvas.strokeStyle = '#3BFC34';
		$.canvas.antiAliasing = true;
		canvasready = true;
	});
	$.onErrorFn = function(){
		var intent = Ti.Android.createIntent({
			action: 'android.settings.APPLICATION_SETTINGS',
		});
		intent.addFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
		Ti.Android.currentActivity.startActivity(intent);
	};
	Ti.App.addEventListener('uncaughtException',$.onErrorFn);
	var audioRecorder = require('titutorial.audiorecorder');
	audioRecorder.startRecording({
		outputFormat : audioRecorder.OutputFormat_MPEG_4,
		audioEncoder : audioRecorder.AudioEncoder_AAC,
		directoryName : "recordings",

		maxDuration : MAXDURATION,
		success : function(e) {
			clearInterval(cron);
		},
		error : function(e) {
			alert("error => " + e.message);
			Ti.API.info("error is => " + JSON.stringify(e));
		}
	});
	Ti.App.removeEventListener('uncaughtException',$.onErrorFn);
	var cron = setInterval(getLevel, TICK	);
	var tick = 0;
	function getLevel() {
		if (audioRecorder.isRecording() && $.canvas && canvasready == true) {
			var level = audioRecorder.getMaxAmplitude() / 20000;
			console.log(Math.log10(level*6000));
			$.canvas.beginPath();
			$.canvas.moveTo(tick, CANVASHEIGHT / 2 - level * CANVASHEIGHT);
			$.canvas.lineTo(tick, CANVASHEIGHT / 2 + level * CANVASHEIGHT);
			tick = tick + LDF;
			$.canvas.closePath();
			$.canvas.stroke();
		}
	}


	$.addEventListener('close', function(_event) {
		clearInterval(cron);
		audioRecorder.stopRecording();
		$.canvas = null;
		canvasready = false;
	});
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Aufnahme');
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

