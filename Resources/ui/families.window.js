module.exports = function(id) {

	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var TSA = new (require('model/tsa.adapter'))();
	var rows = TSA.getFamilies(id).map(function(c) {
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
			width : 100,
			height : 'auto'
		}));
		row.add(Ti.UI.createLabel({
			left : 120,
			text : c.latin,
			top : 10,
			color : COLOR.BROWN,
			height : Ti.UI.SIZE,
			font : {
				fontSize : 22,
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
		require('ui/species.window')(_e.row.itemId).open();
	});
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			function onCloseFn() {
				$.close();
			};
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Familia: '+id);
			АктйонБар.displayUseLogoEnabled = false;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			_event.source.getActivity().actionBar.displayHomeAsUp = true;
			var activity = _event.source.getActivity();
			activity.actionBar.onHomeIconItemSelected = function() {
				$.close();
			};
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
		}

	});
	return $;
};
