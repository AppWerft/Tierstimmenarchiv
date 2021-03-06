if (!String.prototype.trim) {
	(function() {
		// Make sure we trim BOM and NBSP
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		String.prototype.trim = function() {
			return this.replace(rtrim, '');
		};
	})();
}

var Moment = require('vendor/moment');
Moment.locale('de');
const SPECIES = 0,
    FAMILY = 6,
    ORDER = 9,
    CLASS = 11;

const ENDPOINT = 'http://www.tierstimmen.org/';

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
		start = new Date().getTime();
		link.execute('PRAGMA synchronous = OFF');
		link.execute('BEGIN TRANSACTION');
		var ndx = 0,
		    total = 0;
		var that = this;

		this.rows.forEach(function(row, count) {
			var _ = row.C;
			if (count > 0 && Array.isArray(_) && _.length == 30 && !insertedspecies[_[SPECIES]]) {
				link.execute("INSERT INTO species VALUES (?,?,?,?,?)", _[SPECIES].trim(), _[FAMILY].trim(), _[5].trim(), _[4].trim(), '');
				insertedspecies[_[SPECIES]] = true;
			}
			if (count > 0 && Array.isArray(_) && _.length == 30 && !insertedfamilies[_[FAMILY]]) {
				link.execute("INSERT INTO families VALUES (?,?,?,?)", _[FAMILY].trim(), _[ORDER].trim(), _[8].trim(), _[7].trim());
				insertedfamilies[_[FAMILY]] = true;
			}
			link.execute("INSERT OR REPLACE INTO orders VALUES (?,?,?,?)", _[ORDER].trim(), _[11].trim(), '', _[10].trim());
			link.execute("INSERT OR REPLACE INTO classes VALUES (?,?,?)", _[CLASS].trim(), '', '');

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
		//console.log('DatabaseFile=\n' + link.file.nativePath);
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
				link.execute("INSERT INTO records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", _[SPECIES], _[1].trim(), _[2].trim(), _[4].trim(), _[5].trim(), _[14], _[15], _[16], _[17], _[18], _[19], _[20], _[21], _[22], _[23], _[24], _[25], _[26], _[27], _[28], _[29]);
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
		var res = link.execute('SELECT * FROM classes WHERE latin <> "" AND latin <> "Klasse"');
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
				mp3 : ENDPOINT + 'recordings/' + ID + '_short.mp3',
				spectrogram : 'http://mm.webmasterei.com/spectrogram/' + ID + '_short.mp3.wav.png.jpg?1',
				autor : res.fieldByName('autor'),
				itemId : ID,
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
		var res = link.execute('SELECT classes.latin AS class,records.* FROM classes,records,species,families,orders WHERE records.latitude <> 0 AND records.longitude <>0 AND records.species=species.latin AND species.families=families.latin AND families.orders=orders.latin AND orders.classes=classes.latin');
		var records = {};
		while (res.isValidRow()) {
			var ID = res.fieldByName('filename');
			var Class = res.fieldByName('class');
			if (!records[Class])
				records[Class] = [];
			var record = {
				itemId : ENDPOINT + 'recordings/' + ID + '_short.mp3',
				id : ID,
				image : '/images/' + Class + '.png',
				title : res.fieldByName('species'),
				subtitle : res.fieldByName('Beschreibung'),
				lat : res.fieldByName('latitude'),
				lng : res.fieldByName('longitude'),
			};
			records[Class].push(record);
			res.next();
		}
		res.close();
		return records;
	},
	getRecordsBySpeciesWithLatLng : function(_species) {
		var link = Ti.Database.open(DBNAME);
		var records = [];
		var ndx = 0;
		var maxlat,
		    maxlng,
		    minlat,
		    minlng,
		    sumlat = 0,
		    sumlng = 0;
		var res = link.execute('SELECT classes.latin AS class,records.* FROM classes,records,species,families,orders WHERE records.latitude <> 0 AND records.species="' + _species + '" AND records.longitude <>0 AND records.species=species.latin AND species.families=families.latin AND families.orders=orders.latin AND orders.classes=classes.latin');
		while (res.isValidRow()) {
			var ID = res.fieldByName('filename');
			var Class = res.fieldByName('class');

			var lat = parseFloat(res.fieldByName('latitude'), 10) + Math.random() * 0.001 + 0.0005;
			var lng = parseFloat(res.fieldByName('longitude'), 10) + Math.random() * 0.001 + 0.0005;
			if (ndx == 0) {
				maxlat = lat;
				maxlng = lng;
				minlat = lat;
				minlng = lng;
			}
			maxlat = Math.max(lat, maxlat);
			maxlng = Math.max(lng, maxlng);
			minlat = Math.min(lat, minlat);
			minlng = Math.min(lng, minlng);
			sumlat += lat;
			sumlng += lng;
			var record = {
				itemId : ENDPOINT + 'recordings/' + ID + '_short.mp3',
				id : ID,
				image : '/images/' + Class + '.png',
				title : res.fieldByName('species'),
				subtitle : res.fieldByName('Beschreibung'),
				latitude : lat,
				longitude : lng,
			};
			records[ndx] = record;
			ndx += 1;
			res.next();
		}
		res.close();
		var region = {
			latitude : sumlat / ndx,
			longitude : sumlng / ndx,
			latitudeDelta : (maxlat - minlat + 0.05) * 1.2,
			longitudeDelta : (maxlng - minlng + 0.05) * 1.2
		};
		return {
			records : records,
			region : region
		};
	},
	getRecordById : function(id) {
		if (!id)
			return {};
		var link = Ti.Database.open(DBNAME);

		var sql = //
		'SELECT records.*,  '//
		+ 'species.latin species_latin, species.de species_de, species.image image,records.country, records.recording_date, '//
		+ 'families.latin families_latin, families.de families_de, '//
		+ 'orders.latin orders_latin,orders.de orders_de, '//
		+ 'classes.latin classes_latin '//
		+ 'FROM '//
		+ 'classes,orders,families,species,records '//
		+ 'WHERE '//
		+ 'records.filename="' + id + '" AND '//
		+ 'records.species=species.latin AND species.families=families.latin AND families.orders=orders.latin AND orders.classes=classes.latin';
		var res = link.execute(sql);
		var fieldnames = [];
		for (var i = 0; i < res.getFieldCount(); i++) {
			fieldnames.push(res.getFieldName(i));
		}
		var record = {};
		if (res.isValidRow()) {
			var cdate;
			var moment = Moment(res.fieldByName('recording_date'));
			if (moment.isValid())
				cdate = moment.format('LL');
			else {
				if ( moment = res.fieldByName('recording_date').split('_')) {
					cdate = moment[0];
				} else
					cdate = '';

			}
			record = {
				audio : 'http://www.tierstimmenarchiv.de/recordings/' + id + '_short.mp3',
				cdate : cdate,
				spectrogram : 'http://mm.webmasterei.com/spectrogram/' + id + '_short.mp3.wav.png.jpg',
				allRecordsOfSpeciesWithLatLng : this.getRecordsBySpeciesWithLatLng(res.fieldByName('species'))
			};
			fieldnames.forEach(function(fieldname) {
				console.log(fieldname + ' = ' + res.fieldByName(fieldname));
				record[fieldname] = res.fieldByName(fieldname);
			});
		} else {
			Ti.Android && Ti.UI.createNotification({
				message : 'Keine Aufnahme gefunden.\n' + id
			}).show();
			console.log(sql);
		}
		res.close();
		link.close();
		return record || null;
	},
	searchAnimals : function(needle) {
		var link = Ti.Database.open(DBNAME);
		var res = link.execute('SELECT * FROM records WHERE deutscher_name LIKE "%' + needle + '%" AND species <> "div." ORDER BY species LIMIT 500');
		var records = [];
		while (res.isValidRow()) {
			var itemId = res.fieldByName('filename');
			var record = {
				species : res.fieldByName('species'),
				deutscher_name : res.fieldByName('deutscher_name') || res.fieldByName('species'),
				beschreibung : res.fieldByName('Beschreibung'),
				spectrogram : 'http://mm.webmasterei.com/spectrogram/' + itemId + '_short.mp3.wav.png.jpg?1',
				autor : res.fieldByName('autor'),
				audio : 'http://www.tierstimmenarchiv.de/recordings/' + itemId + '_short.mp3',
				itemId : itemId,
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
	getLargeImage : function(_id) {
		var link = Ti.Database.open(DBNAME);
		var res = link.execute('SELECT image from species WHERE latin=?', _id);
		if (res.isValidRow()) {
			var image = res.fieldByName("image");
		} else
			console.log('Warning: no alrge image found for ' + _id);
		res.close();
		link.close();
		return image;
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

