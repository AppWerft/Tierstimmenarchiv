var FrogSounds = require('model/recordings.adapter');
var АктйонБар = require('com.alcoapps.actionbarextras');
const COLOR = {
	LIGHTGREEN : '#D5E3CB',
	DARKGREEN : '#174122',
	BROWN : '#B87C25'
};

module.exports = function(id) {
	var timer;
	var $ = Ti.UI.createWindow({
		fullscreen : false,
		theme : "Theme.WithActionBar",
		backgroundColor : 'transparent'
	});
	$.add(Ti.UI.createView({
		backgroundColor : '#80ffffff'
	}));
	$.searchView = Ti.UI.createTextField({
		height : 40,
		top : 0,
		font : {
			fontFamily : 'Helvetica-Bold',
			fontSize : 18
		},
		width : '90%',
		borderRadius : 5,
		autocorrect:false,
		color : COLOR.DARKGREEN,
		
		zIndex : 999,
		hintText : "Suchbegriff, beispielsweise „Esel“",
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
	});
	$.addEventListener('open', function(_event) {
		function onCloseFn() {
			$.close();
		};
		АктйонБар.setTitle('Tierstimmenarchiv');
		АктйонБар.setFont('Helvetica-Bold');
		АктйонБар.setSubtitle('Naturkundemuseum Berlin');
		АктйонБар.displayUseLogoEnabled = false;
		АктйонБар.setStatusbarColor(COLOR.BROWN);
		_event.source.getActivity().actionBar.displayHomeAsUp = false;
		var activity = _event.source.getActivity();
		АктйонБар.backgroundColor = COLOR.DARKGREEN;
		$.searchView.animate({
			top : 90,
			duration : 1000
		}, function() {
			
				Ti.UI.createNotification({
					message : 'Geben Sie einen Suchbegriff ein.'
				}).show();
				$.searchView.focus();
			
		});
	});

	$.listView = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
		})],
		templates : {
			'template' : require('TEMPLATES').animalsounds
		},
		defaultItemTemplate : 'template',
		top : 120
	});
	$.add($.listView);
	$.add($.searchView);
	$.searchView.addEventListener('change', function(_e) {
		var needle = _e.source.getValue();
		if (needle.length == 0) {
			$.listView.sections[0].items = [];
			$.listView.backgroundColor = 'transparent';
			_e.source.blur();
		} else if (needle.length > 2) {
			
			if (timer)
				clearTimeout(timer);
			timer = setTimeout(function() {
				var items = FrogSounds.searchAnimals(needle).map(function(sound) {
					return {
						properties : {
							itemId : JSON.stringify(sound),
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
						},
						title : {
							text : sound.title,
							color : COLOR.DARKGREEN
						},
						spectrogram : {
							image : sound.spectrogram
						}
					};
				});
				
				$.listView.sections[0].items = items;
				$.listView.backgroundColor = COLOR.BROWN;
				setTimeout(function() {
					$.searchView.blur();
				}, 200);
			}, 600);
		}
	});
	$.listView.addEventListener('itemclick', function(_e) {
		var sound = JSON.parse(_e.itemId);
		require('ui/player.window')(sound).open();
	});
	$.addEventListener('close', function(_e) {
		if ($ && $.listView)
			$.listView = null;
	});
	require('vendor/versionsreminder')();
	return $;
};
