var RingTone = require('de.appwerft.ringtonmanager');

module.exports = function(record) {
	if (!Ti.Filesystem.isExternalStoragePresent())
		return;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var soundfile = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, record.filename + '.mp3');
			soundfile.write(this.responseData);
			RingTone.setActualDefaultRingtone({
				url : soundfile.nativePath,
				title : record.species_latin
			}, function(_e) {
				Ti.UI.createNotification({
					message : 'Klingelton geändert.'
				}).show();
			});

		}
	});
	xhr.open('GET', record.audio);
	xhr.send();
};
