module.exports = function(id) {

	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var TSA = new (require('model/tsa.adapter'))();
	var rows = TSA.getSpeciesByFamily(id).map(function(c) {
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			hasChild : true,
			itemId : c.latin
		});
		row.add(Ti.UI.createImageView({
			
			defaultImage : '/assets/default.png',
			top : 0,
			left : 0,
			width : 110,
			height : 'auto'
		}));
		row.add(Ti.UI.createView({
			left : 120,
			top : 10,
			layout : 'vertical'
		}));
		row.children[1].add(Ti.UI.createLabel({
			left : 0,
			text : c.latin,
			top : 0,
			color : COLOR.DARKGREEN,
			height : Ti.UI.SIZE,
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			}
		}));
		row.children[1].add(Ti.UI.createLabel({
			left : 0,
			top : 5,
			text : c.de,
			color : COLOR.BROWN,
			height : Ti.UI.SIZE,
			font : {
				fontSize : 18,

			}
		}));
		require('vendor/wikimedia.adapter').getSpeciesImage(c.latin, function(_imageblob) {
				row.children[0].setHeight(_imageblob.height * 110 / _imageblob.width);
				row.children[0].setWidth(110);

			row.children[0].setImage(_imageblob);
		});
		return row;
	});
	$.list = Ti.UI.createTableView({
		top : 0,
		data : rows
	});
	$.add($.list);
	$.list.addEventListener('click', function(_e) {
		require('ui/records.window')(_e.row.itemId).open();
	});
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Family: ' + id);
			АктйонБар.displayUseLogoEnabled = false;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
			_event.source.getActivity().actionBar.displayHomeAsUp = true;
			var activity = _event.source.getActivity();
			activity.actionBar.onHomeIconItemSelected = function() {
				$.close();
			};

		}

	});

	return $;
};
