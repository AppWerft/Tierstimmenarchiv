var АктйонБар = require('com.alcoapps.actionbarextras');
const DURATION = 20000;

module.exports = function(sound) {
	var audioPlayer = Ti.Media.createAudioPlayer({
		url : sound.mp3,
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
		backgroundColor : 'transparent',
		title : '',
		theme : 'Theme.NoActionBar',
		fullscreen : true,
		screenOrientations : [Ti.UI.PORTRAIT]
	});
	$.darker = Ti.UI.createView({
		backgroundColor : '#a030'
	});
	$.add($.darker);
	$.addEventListener('click', function() {
		$.close();
	});
	$.playerView = Ti.UI.createView({
		backgroundColor : 'black',
		bottom : 0,
		height : 200
	});
	$.playerView.add(Ti.UI.createImageView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		image : sound.spectrogram
	}));
	$.playerView.darker = Ti.UI.createView({
		backgroundColor : '#e000',
		width : '100%',
		right : 0
	});
	$.playerView.add($.playerView.darker);
	$.playerView.add(Ti.UI.createLabel({
		text : sound.title,
		color : COLOR.LIGHTGREEN,
		bottom : 160,
		opacity : 0.4,
		height : 33,
		wordWrap : false,
		ellipsize : Ti.UI.TEXT_ELLIPSIZE_TRUNCATE_MARQUEE,
		font : {
			fontSize : 24,
			fontWeight : 'bold'
		}
	}));

	$.add($.playerView);
	$.addEventListener('close', function() {
		audioPlayer.pause();
		audioPlayer.stop();
		audioPlayer.release();
		audioPlayer = null;
	});
	audioPlayer.start();
	return $;
};
