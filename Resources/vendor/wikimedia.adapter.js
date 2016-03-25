var Module = function(_latin, _callback) {
	var largeimageurl;
	const FOLDER = 'imagecache.thumbnail';
	var onLoadFn = function() {
		_callback.onload && typeof _callback.onload == 'function' && _callback.onload(arguments[0]);
	};
	var onProgressFn = function() {
		_callback.onprogress && typeof _callback.onprogress == 'function' && _callback.onprogress(arguments[0]);
	};

	var DEPOT = Ti.Filesystem.applicationCacheDirectory;
	var folder = Ti.Filesystem.getFile(DEPOT, FOLDER);
	if (!folder.exists()) {
		folder.createDirectory();
	}
	var file = Ti.Filesystem.getFile(DEPOT, FOLDER, _latin + '.jpg');
	if (file.exists()) {
		var image = file.read();
		onLoadFn(image);
		return;
	}
	var xhr = Ti.Network.createHTTPClient({
		//ondatastream : onProgressFn,
		autoRedirect : true,
		onload : function() {
			var html = this.responseText;
			var regex = /src="\/\/upload(.*?)\.jpg"/gim;
			var res = regex.exec(html);
			res && console.log(res[1]);
			if (res) {
				var imageurl = 'https://upload' + res[1] + '.jpg';

				res = imageurl.replace('/thumb/', '/').match(/(^http.*?\.jpg)/i);
				if (res && !imageurl.match(/\.svg/)) {
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
	var url = 'https://species.m.wikimedia.org/wiki/' + _latin.replace(' ', '_');
	console.log('URL=' + url);
	xhr.open('GET', url);
	xhr.setRequestHeader('Content-Type', "text/html","charset=UTF-8");
	xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5');
	xhr.send();

	return this;
};

module.exports = Module;

/*/upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Masticophis_flagellum.jpg/450px-Masticophis_flagellum.jpg
 /upload.wikimedia.org/wikipedia/commons/f/f6/Masticophis_flagellum.jpg*/