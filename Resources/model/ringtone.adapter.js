module.exports = function(record) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var DEPOT = Ti.Filesystem.applicationCacheDirectory;
			var fn = Ti.Filesystem.getFile(DEPOT, record.filename);
			fn.write(this.responseData);
			require('de.appwerft.ringtonemanager').setActualDefaultRingtone(fn.nativePath);
		}
	});
	xhr.open('GET',url.audio);
	xhr.send();
	
};
