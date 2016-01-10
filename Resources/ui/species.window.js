module.exports = function(id) {

	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var TSA = new (require('model/tsa.adapter'))();
	var rows = TSA.getSpecies(id).map(function(c) {
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			hasChild : true,
			itemId : c.latin
		});
		row.add(Ti.UI.createImageView({
			image : c.image,
			defaultImage : '/assets/default.png',
			top : 0,
			left : 0,
			width : 90,
			height : 'auto'
		}));
		row.add(Ti.UI.createLabel({
			left : 100,
			text : c.latin,
			top : 10,
			color : COLOR.BROWN,
			height : Ti.UI.SIZE,
			font : {
				fontSize : 20,
				fontWeight : 'bold'
			}
		}));
		row.add(Ti.UI.createLabel({
			left : 150,
			top : 40,
			text : c.de,
			color : COLOR.BROWN,
			height : Ti.UI.SIZE,
			font : {
				fontSize : 18,

			}
		}));
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
			АктйонБар.setSubtitle('Species: ' + id);
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
