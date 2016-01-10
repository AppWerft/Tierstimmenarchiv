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
		defaultItemTemplate : 'template',
	});
	$.add($.listView);
	var TSA = new (require('model/tsa.adapter'))();
	var records = TSA.getRecords(id);
	var lastndx;

	$.listView.sections[0].items = records.map(function(sound) {
		return {
			properties : {
				itemId : JSON.stringify(sound),
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
	
	$.listView.addEventListener('itemclick', function(_e) {
		var sound = JSON.parse(_e.itemId);
		require('ui/player.window')(sound).open();
	});
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
	require('vendor/versionsreminder')();
	return $;
};
