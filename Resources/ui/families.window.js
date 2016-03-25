module.exports = function(id) {

	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var TSA = new (require('model/tsa.adapter'))();
	require('vendor/permissions').requestPermissions('WRITE_EXTERNAL_STORAGE', function(_success) {
		if (_success == true) {
			$.list = Ti.UI.createTableView({top:TOP,
				data : TSA.getFamiliesByOrdo(id).map(require('ui/taxo.row'))
			});
			$.add($.list);
		} else
			alert('Die Berechtigung wird für die Zwischenspeicherung der Tierbilder benötigt.');
		$.list.addEventListener('click', function(_e) {
			require('ui/species.window')(_e.row.itemId).open();
		});
	});

	$.addEventListener('open', function(_event) {
		if (Ti.Android) {
			var АктйонБар = require('com.alcoapps.actionbarextras');
			function onCloseFn() {
				$.close();
				$ = null;
			};
			АктйонБар.setTitle('Tierstimmenarchiv');
			АктйонБар.setFont('Helvetica-Bold');
			АктйонБар.setSubtitle('Ordo: ' + id);
			АктйонБар.displayUseLogoEnabled = false;
			АктйонБар.setStatusbarColor(COLOR.BROWN);
			_event.source.getActivity().actionBar.displayHomeAsUp = true;
			var activity = _event.source.getActivity();
			activity.actionBar.onHomeIconItemSelected = onCloseFn;
			АктйонБар.backgroundColor = COLOR.DARKGREEN;
		}

	});
	return $;
};
