const DBNAME = 'TSA0';

var Module = function() {
	if (!Ti.App.Properties.hasProperty(DBNAME)) {
		var TSA = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'tsa.json').read().text);
		var recordfields = "species TEXT, erstbeschreibung TEXT, subspecies TEXT, deutscher_name TEXT, english_name TEXT, ort TEXT, country TEXT,latitude NUMBER,longitude NUMBER,altitude NUMBER,recording_date TEXT,recording_time TEXT,sex TEXT,age TEXT,Beschreibung TEXT,Description TEXT,sound_type TEXT,Autor TEXT,filename TEXT,mp3_Datei TEXT,Copyright TEXT";
		var rows = TSA.Workbook.Worksheet.Table.Row;
		Ti.UI.createNotification({
			top : '60%',
			message : 'Starte initialen Import der Tierstimmendatenbank\n' + rows.length + ' Aufnahmen …'
		}).show();
		var link = Ti.Database.open(DBNAME);
		this.eventhandlers = [];
		link.execute('CREATE TABLE IF NOT EXISTS records (' + recordfields + ')');
		link.close();
		console.log('DB initiated');
		var link = Ti.Database.open(DBNAME);
		link.execute('PRAGMA synchronous = OFF');
		link.execute('DELETE FROM records');
		link.execute('BEGIN TRANSACTION');
		console.log('DB transaction started');
		var ndx = 0,
		    total = 0;
		var that = this;
		rows.forEach(function(row, count) {
			if (!(count % 500)) {
				that.fireEvent('progress', {
					progress : count,
					total : rows.length
				});
				console.log(count + '/' + rows.length);
			}
			if (count > 0 && Array.isArray(row.C) && row.C.length == 30) {
				link.execute("INSERT OR REPLACE INTO records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", //
				row.C[0], row.C[1], row.C[2], row.C[4],row.C[5], //
				row.C[14], row.C[15], row.C[16], row.C[17], row.C[18], row.C[19], row.C[20], row.C[21], row.C[22], row.C[23], row.C[24], row.C[25], row.C[26], row.C[27], row.C[28], row.C[29]);
			}
		});
		link.execute('COMMIT');
		console.log('DB transaction finished');
		link.close();

		this.fireEvent('ready', {});
		Ti.App.Properties.setBool('TSA', true);
	}
};

Module.prototype = {
	searchAnimals : function(needle) {
		var link = Ti.Database.open(DBNAME);
		var res = link.execute('SELECT * FROM records WHERE deutscher_name LIKE "%' + needle + '%" ORDER BY species LIMIT 200');
		var records = [];
		while (res.isValidRow()) {
			var ID = res.fieldByName('filename');
			var record = {
				species : res.fieldByName('species'),
				deutscher_name : res.fieldByName('deutscher_name') || res.fieldByName('species'),
				beschreibung : res.fieldByName('Beschreibung'),
				gps : res.fieldByName('latitude') + ',' + res.fieldByName('longitude'),
				mp3 : 'http://www.tierstimmenarchiv.de/recordings/' + ID + '_short.mp3',
				spectrogram : 'http://mm.webmasterei.com/spectrogram/' + ID + '_short.mp3.wav.png.jpg',
				autor : res.fieldByName('autor'),

				copyright : res.fieldByName("Copyright")
			};
			records.push(record);
			res.next();
		}
		res.close();
		var species = {};
		records.forEach(function(record) {
			if (!species[record.species]) {
				species[record.species] = [];
			}
			species[record.species].push(record);
		});
		return species;
	},
	fireEvent : function(_event, _payload) {
		if (this.eventhandlers[_event]) {
			for (var i = 0; i < this.eventhandlers[_event].length; i++) {
				this.eventhandlers[_event][i].call(this, _payload);
			}
		}
	},
	addEventListener : function(_event, _callback) {
		if (!this.eventhandlers[_event])
			this.eventhandlers[_event] = [];
		this.eventhandlers[_event].push(_callback);
	},
	removeEventListener : function(_event, _callback) {
		if (!this.eventhandlers[_event])
			return;
		var newArray = this.eventhandlers[_event].filter(function(element) {
			return element != _callback;
		});
		this.eventhandlers[_event] = newArray;
	}
};

module.exports = Module;

