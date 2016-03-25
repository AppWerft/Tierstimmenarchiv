module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	$.listView = Ti.UI.createListView({
		sections : [Ti.UI.createListSection({
		})],
		templates : {
			'template' : require('TEMPLATES').animalsounds
		},
		top : TOP,
		defaultItemTemplate : 'template',
	});
	$.add($.listView);
	var TSA = new (require('model/tsa.adapter'))();
	var records = TSA.getRecordsBySpecies(id);
	var lastndx;
	console.log(records);
	$.listView.sections[0].items = records.map(function(sound) {
		return {
			properties : {
				itemId : sound.itemId,
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			},
			deutscher_name : {
				text : sound.deutscher_name,
				color : COLOR.DARKGREEN
			},
			autor : {
				text : sound.autor,

			},
			beschreibung : {
				text : sound.beschreibung,
				color : COLOR.DARKGREEN
			},
			spectrogram : {
				image : sound.spectrogram
			}
		};

	});

	$.listView.addEventListener('itemclick', require('ui/player.window'));

	$.addEventListener('focus', function(_e) {
		if ($ && $.searchView)
			$.searchView.animate({
				top : 0
			}, function() {

				Ti.Android && Ti.UI.createNotification({
					message : 'Geben Sie einen Suchbegriff ein.'
				}).show();
				$.searchView.focus();
			});
	});
	$.addEventListener('close', function(_e) {
	});
	$.addEventListener('blur', function(_e) {
	});
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Species: ' + id);
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
	require('vendor/versionsreminder')();
	return $;
};
