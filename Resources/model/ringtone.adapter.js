module.exports = function(record) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var fn = Ti.Filesystem.getFile(Ti.Filesystem.applicationCacheDirectory, record.filename);
			fn.write(this.responseData);
			require('de.appwerft.ringtonmanager').setActualDefaultRingtone(fn.nativePath);
		}
	});
	xhr.open('GET',record.audio);
	xhr.send();
	
};
