const DBNAME = 'TSAxx';

var Module = function() {
	this.eventhandlers = [];
};

Module.prototype = {
	Import_isDone : function() {
		return Ti.App.Properties.hasProperty(DBNAME);
	},
	Import_Init : function() {
		var start = new Date().getTime();
		this.rows = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'tsa.json').read().text).Workbook.Worksheet.Table.Row;
		console.log('durationJSONparsing :' + (new Date().getTime() - start));
	},
	Import_loadTaxo : function() {
		const SPECIES = 0,
		    FAMILY = 6,
		    ORDER = 9,
		    CLASS = 11;
		var start = new Date().getTime();
		var insertedspecies = {};
		var insertedfamilies = {};

		// daves inserted species
		var link = Ti.Database.open(DBNAME);
		Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'init.sql').read().text.split('\n').forEach(function(sql) {
			if (sql.length > 1) {
				link.execute(sql);
			}
		});
		console.log('durationCREATING TABLES :' + (new Date().getTime() - start));
		start = new Date().getTime();
		link.execute('PRAGMA synchronous = OFF');
		link.execute('BEGIN TRANSACTION');
		var ndx = 0,
		    total = 0;
		var that = this;
		this.rows.forEach(function(row, count) {
			if (count > 0 && Array.isArray(row.C) && row.C.length == 30 && !insertedspecies[row.C[SPECIES]] && !insertedfamilies[row.C[FAMILY]]) {
				var _ = row.C;
				link.execute("INSERT INTO species VALUES (?,?,?,?)", _[SPECIES], _[6], _[5], _[4]);
				link.execute("INSERT INTO families VALUES (?,?,?,?)", _[FAMILY], _[9], _[8], _[7]);
				link.execute("INSERT OR REPLACE INTO orders VALUES (?,?,?,?)", _[ORDER], _[11], '', _[10]);
				link.execute("INSERT OR REPLACE INTO classes VALUES (?,?,?)", _[CLASS], '', '');
				insertedspecies[_[SPECIES]] = true;
				insertedfamilies[_[FAMILY]] = true;
			}
		});
		link.execute('COMMIT');
		console.log('DB TAXO transaction finished');
		link.close();
		console.log('durationTaxo :' + (new Date().getTime() - start));
		Ti.App.Properties.setBool(DBNAME + 'TAXO', true);
		return true;

	},
	Import_loadRecords : function() {
		var start = new Date().getTime();
		var link = Ti.Database.open(DBNAME);
		link.execute('PRAGMA synchronous = OFF');
		link.execute('BEGIN TRANSACTION');
		var ndx = 0,
		    total = 0;
		var that = this;
		this.rows.forEach(function(row, count) {
			if (count > 0 && Array.isArray(row.C) && row.C.length == 30) {
				var _ = row.C;
				if (!(count % 50)) {
					that.fireEvent('progress', {
						progress : count / that.rows.length
					});
				}
				link.execute("INSERT INTO records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", _[0], _[1], _[2], _[4], _[5], _[14], _[15], _[16], _[17], _[18], _[19], _[20], _[21], _[22], _[23], _[24], _[25], _[26], _[27], _[28], _[29]);
			}
		});
		link.execute('COMMIT');
		console.log('DB transaction finished');
		link.close();
		console.log('durationRecords :' + (new Date().getTime() - start) + ' ms.');
		Ti.App.Properties.setBool(DBNAME, true);
		return true;

	},
	getAllClasses : function() {
		var link = Ti.Database.open(DBNAME);
		var res = link.execute('SELECT * FROM classes WHERE latin <> ""');
		var classes = [];
		while (res.isValidRow()) {
			var item = {
				latin : res.fieldByName('latin'),
				de : res.fieldByName('de'),
				en : res.fieldByName('en'),
				image : '/assets/' + res.fieldByName('latin').toLowerCase() + '.png'

			};
			classes.push(item);
			res.next();
		}
		res.close();
		link.close();
		return classes.sort(function(a, b) {
			return a.latin > b.latin ? true : false;
		});
	},
	getOrdersByClass : function(id) {
		var link = Ti.Database.open(DBNAME);
		var res = link.execute('SELECT * FROM orders WHERE classes = ?', id);
		var classes = [];
		while (res.isValidRow()) {
			var item = {
				latin : res.fieldByName('latin'),
				de : res.fieldByName('de'),
				en : res.fieldByName('en'),
				image : '/assets/' + res.fieldByName('latin').toLowerCase() + '.png'

			};
			classes.push(item);
			res.next();
		}
		res.close();
		link.close();
		return classes.sort(function(a, b) {
			return a.latin > b.latin ? true : false;
		});
	},
	getFamiliesByOrdo : function(id) {
		var link = Ti.Database.open(DBNAME);
		console.log(id);
		var res = link.execute('SELECT * FROM families WHERE orders = ?', id);
		var families = [];
		while (res.isValidRow()) {
			var item = {
				latin : res.fieldByName('latin'),
				de : res.fieldByName('de'),
				en : res.fieldByName('en'),
				image : '/assets/' + res.fieldByName('latin').toLowerCase() + '.png'

			};
			families.push(item);
			res.next();
		}
		res.close();
		link.close();
		console.log(families);
		return families.sort(function(a, b) {
			return a.latin > b.latin ? true : false;
		});
	},
	getSpeciesByFamily : function(id) {
		var link = Ti.Database.open(DBNAME);

		var res = link.execute('SELECT * FROM species WHERE families = ?', id);
		var species = [];
		while (res.isValidRow()) {
			var item = {
				latin : res.fieldByName('latin'),
				de : res.fieldByName('de'),
				en : res.fieldByName('en'),
				image : '/assets/' + res.fieldByName('latin').toLowerCase() + '.png'

			};
			species.push(item);
			res.next();
		}
		res.close();
		link.close();

		return species.sort(function(a, b) {
			return a.latin > b.latin ? true : false;
		});
	},
	getRecordsBySpecies : function(id) {
		var link = Ti.Database.open(DBNAME);
		var res = link.execute('SELECT * FROM records WHERE species = ?', id);
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
		link.close();
		return records;

	},
	getRecordsWithLatLng : function() {
		var link = Ti.Database.open(DBNAME);
		console.log('getRecordsWithLatLng ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈');
		var res = link.execute('SELECT * FROM records WHERE latitude <> 0 AND longitude <>0');
		var records = [];
		while (res.isValidRow()) {
			var ID = res.fieldByName('filename');
			var record = {
				itemId :  'http://www.tierstimmenarchiv.de/recordings/' + ID + '_short.mp3',
				id :   ID,
				image : '/assets/point.png',
				title : res.fieldByName('species'),
				subtitle : res.fieldByName('Beschreibung'),
				lat : res.fieldByName('latitude'),
				lng : res.fieldByName('longitude'),
			};
			records.push(record);
			res.next();
		}
		res.close();
		console.log('~~~~~~~~~POIs:'+ records.length);
		return records;
	},
	searchAnimals : function(needle) {
		var link = Ti.Database.open(DBNAME);
		var res = link.execute('SELECT * FROM records WHERE deutscher_name LIKE "%' + needle + '%" ORDER BY species LIMIT 500');
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
		if (!this.eventhandlers)
			this.eventhandlers = {};
		if (this.eventhandlers[_event]) {
			for (var i = 0; i < this.eventhandlers[_event].length; i++) {
				this.eventhandlers[_event][i].call(this, _payload);
			}
		}
	},
	addEventListener : function(_event, _callback) {
		if (!this.eventhandlers)
			this.eventhandlers = {};
		if (!this.eventhandlers[_event])
			this.eventhandlers[_event] = [];
		this.eventhandlers[_event].push(_callback);
	},
	removeEventListener : function(_event, _callback) {
		if (!this.eventhandlers)
			this.eventhandlers = {};
		if (!this.eventhandlers[_event])
			return;
		var newArray = this.eventhandlers[_event].filter(function(element) {
			return element != _callback;
		});
		this.eventhandlers[_event] = newArray;
	}
};

module.exports = Module;

