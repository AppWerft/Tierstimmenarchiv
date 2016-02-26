module.exports = function(record) {
	var TiPermission = require('ti.permissions');
	if (TiPermission.hasPermission('android.permission.SYSTEM_WRITE')) {
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				var fn = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, record.filename);
				fn.write(this.responseData);

				require('de.appwerft.ringtonmanager').setActualDefaultRingtone(fn.nativePath);
			}
		});
		xhr.open('GET', record.audio);
		xhr.send();
	} else {
		TiPermission.requestPermission('android.permission.SYSTEM_WRITE', 123, function() {
			if (e.requestCode == 123 && e.success == true) {
				require('de.appwerft.ringtonmanager').setActualDefaultRingtone(fn.nativePath);
			}
		});
	}
};
