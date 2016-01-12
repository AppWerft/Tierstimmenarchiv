module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	console.log('Info: window orders opened ≈≈≈≈≈≈≈≈≈≈≈≈≈≈ ' + id);

	$.addEventListener('close', function(_event) {
		console.log('ordo window closed by event   ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈');
		_event.source = null;

	});
	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var activity = _event.source.getActivity();
			activity.actionBar.onHomeIconItemSelected = onCloseFn;
			var АктйонБар = require('com.alcoapps.actionbarextras');
			function onCloseFn() {
				console.log('ordo window closed   from <-  ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈');
				_event.source.close();

			};
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Class: ' + id);
			АктйонБар.displayUseLogoEnabled = false;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			_event.source.getActivity().actionBar.displayHomeAsUp = true;
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
		}
		var TSA = new (require('model/tsa.adapter'))();
		var rows = TSA.getOrdersByClass(id).map(require('ui/taxo.row')(c));
		$.list = Ti.UI.createTableView({
			data : rows
		});
		$.add($.list);
		$.list.addEventListener('click', function(_e) {
			require('ui/families.window')(_e.row.itemId).open();
		});
	});
	return $;
};
