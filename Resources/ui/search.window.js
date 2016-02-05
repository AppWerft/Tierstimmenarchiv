module.exports = function(id) {
	var timer;
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});

	$.searchView = Ti.UI.createTextField({
		height : 40,
		top : -50,
		font : {
			fontFamily : 'Helvetica-Bold',
			fontSize : 18
		},
		width : '90%',
		borderRadius : 5,
		autocorrect : false,
		color : COLOR.DARKGREEN,
		borderRadius : 5,
		borderWidth : Ti.Android ? 0 : 1,
		borderColor : 'silver',
		zIndex : 999,
		hintText : "Suchbegriff, beispielsweise „Esel“",
		softKeyboardOnFocus : Ti.Android ? Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS : undefined
	});

	$.listView = Ti.UI.createListView({
		sections : [],
		templates : {
			'template' : require('TEMPLATES').animalsounds
		},
		defaultItemTemplate : 'template',
		top : Ti.Android ? 50 : 50
	});

	$.add($.listView);
	$.add($.searchView);
	var TSA = new (require('model/tsa.adapter'))();
	$.searchView.addEventListener('change', function(_e) {
		var needle = _e.source.getValue();
		if (needle.length == 0) {
			$.listView.setSections([]);
			$.listView.backgroundColor = 'transparent';
			_e.source.blur();
		} else if (needle.length > 2) {
			if (timer)
				clearTimeout(timer);
			timer = setTimeout(function() {
				var species = TSA.searchAnimals(needle);
				var lastndx;
				var sections = [];
				Object.getOwnPropertyNames(species).forEach(function(spec, ndx) {
					sections[ndx] = Ti.UI.createListSection({
						headerTitle : spec
					});
					sections[ndx].items = species[spec].map(function(record) {
						console.log(record);
						return {
							properties : {
								itemId : record.itemId,
								accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
							},
							deutscher_name : {
								text : record.deutscher_name,
								color : COLOR.DARKGREEN
							},
							autor : {
								text : record.autor,

							},
							beschreibung : {
								text : record.beschreibung,
								color : COLOR.DARKGREEN
							},
							spectrogram : {
								image : record.spectrogram
							}
						};
					});

				});
				$.listView.setSections(sections);
				$.listView.backgroundColor = COLOR.BROWN;
				setTimeout(function() {
					$.searchView.blur();
				}, 200);
			}, 600);
		}
	});
	$.listView.addEventListener('itemclick', require('ui/player.window'));
	var onFocusFn = function(_e) {
		$.removeEventListener('focus', onFocusFn);
		if ($ && $.searchView)
			$.searchView.animate({
				top : 0
			}, function() {
				Ti.Android && Ti.UI.createNotification({
					message : 'Geben Sie einen Suchbegriff ein.',
					duration : 100
				}).show();
				$.searchView.focus();
			});
	};
	$.addEventListener('focus', onFocusFn);
	$.addEventListener('blur', function(_e) {
	});
	require('vendor/versionsreminder')();
	return $;
};
