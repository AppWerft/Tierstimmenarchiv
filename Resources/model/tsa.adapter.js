var records = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'recordslist.text').read().text;
var animals = records.split('\n').map(function(line){
	return line.split(/\s+/g)[0].replace('_short.mp3', '');
});
records=null;

exports.searchAnimals = function(needle) {
	var result = [];
	animals.forEach(function(key) {
		if (key.match(new RegExp(needle, 'gmi')))
			result.push({
				mp3 : 'http://www.tierstimmenarchiv.de/recordings/' + key + '_short.mp3',
				spectrogram : 'http://mm.webmasterei.com/spectrogram/' + key + '_short.mp3.wav.png.jpg',
				title : key.replace(/_/g, ' ').replace(/[\d]+/g, '').replace(/^\s+/, '').replace('luegel', 'lügel').replace('aenchen', 'änchen').replace('aefer', 'äfer')
			});
	});
	return result;
};
