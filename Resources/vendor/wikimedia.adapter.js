var Module = function(_latin, _callback) {
	var largeimageurl;
	const FOLDER = 'imagecache.thumbnail';
	var onLoadFn = function() {
		_callback.onload && typeof _callback.onload == 'function' && _callback.onload(arguments[0]);
	};
	var onProgressFn = function() {
		_callback.onprogress && typeof _callback.onprogress == 'function' && _callback.onprogress(arguments[0]);
	};
	if (Ti.Filesystem.isExternalStoragePresent())
		var DEPOT = Ti.Filesystem.externalStorageDirectory;
	else
		var DEPOT = Ti.Filesystem.applicationDataDirectory;
	var folder = Ti.Filesystem.getFile(DEPOT, FOLDER);
	if (!folder.exists()) {
		folder.createDirectory();
	}
	var file = Ti.Filesystem.getFile(DEPOT, FOLDER, _latin + '.jpg');
	if (file.exists()) {
		var image = file.read();
		onLoadFn(image);

	} else {
		var xhr = Ti.Network.createHTTPClient({
			ondatastream : onProgressFn,
			onload : function() {
				var regex = /class="thumbimage" srcset="(.*?)"/gi;
				var res = regex.exec(this.responseText);
				if (res && !res[1].match(/\.svg/)) {
					var imageurl = 'https:' + res[1].split(' ')[2];
					res = imageurl.replace('/thumb/', '/').match(/(^http.*?\.jpg)/i);
					if (res) {
						largeimageurl = res[1];
						console.log(largeimageurl);
						var link = Ti.Database.open(DBNAME);
						link.execute('UPDATE species SET image=? WHERE latin=?', largeimageurl, _latin);
						link.close();
					}
					var cache = Ti.Network.createHTTPClient({
						onload : function() {
							console.log('file written ' + this.responseData.length);
							file.write(this.responseData);
							var image = file.read();
							onLoadFn(image);
						}
					});
					cache.open('GET', imageurl);
					cache.send();
				}
			}
		});
		var url = 'https://species.wikimedia.org/wiki/' + _latin.replace(' ', '_');
		xhr.open('GET', url);
		xhr.send();
	}
	return this;
};

module.exports = Module;

/*/upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Masticophis_flagellum.jpg/450px-Masticophis_flagellum.jpg
 /upload.wikimedia.org/wikipedia/commons/f/f6/Masticophis_flagellum.jpg*/