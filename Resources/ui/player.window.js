const DURATION = 20000;
var TSA = new (require('model/tsa.adapter'))();

module.exports = function(_e) {
	var record = TSA.getRecordById(_e.itemId);
	if (!record)
		return;
	var audioPlayer = Ti.Media.createAudioPlayer({
		url : record.audio,
		allowBackground : true,
		volume : 1
	});
	audioPlayer.addEventListener('progress', function(_e) {
		// calculation of width:
		//	var procent = (100 * (1 - _e.progress / DURATION)) + '%';
		//	$.playerView.darker && $.playerView.darker.setWidth(procent);
	});
	audioPlayer.addEventListener('change', function(_e) {
		if (_e.state == 3) {
			console.log(audioPlayer.duration);
			var duration = audioPlayer.duration || DURATION;
			$.playerView.darker && $.playerView.darker.animate({
				width : 0,
				duration : duration
			});
		}
		// calculation of width:
		console.log(_e.state);
	});
	audioPlayer.addEventListener('complete', function(_e) {
		$.close();
	});
	var $ = Ti.UI.createWindow({
		backgroundColor : 'transparent'
	});
	$.listView = Ti.UI.createTableView({
		bottom : 200,backgroundColor:'#80ffffff'
	});
	$.playerView = Ti.UI.createView({
		backgroundColor : 'black',
		bottom : 0,
		height : 200
	});
	$.playerView.add(Ti.UI.createImageView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		image : record.spectrogram
	}));
	$.playerView.darker = Ti.UI.createView({
		backgroundColor : '#e000',
		width : '100%',
		right : 0
	});
	$.playerView.add($.playerView.darker);

	$.add($.playerView);
	$.add($.listView);

	$.addEventListener('close', function() {
		audioPlayer.pause();
		audioPlayer.stop();
		audioPlayer.release();
		audioPlayer = null;
	});
	audioPlayer.start();
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Aufnahme von: ' + record.Autor);
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
	$.open();
};
