const COLOR = {
	LIGHTGREEN : '#D5E3CB',
	DARKGREEN : '#174122',
	BROWN : '#B87C25'
},
    DBNAME = 'TSA11',
    TOP = 82.0,
    BIGTOP = 122;

Ti.App.Android.Permissions = require('ti.permissions');

var TSA = new (require('model/tsa.adapter'))();

//require('math.min');

if (TSA.Import_isDone()) {
	require('ui/tabgroup')();

} else {
	TSA.Import_Init();
	TSA.Import_loadTaxo();
	setTimeout(function() {
		TSA.Import_loadRecords();
		Ti.Android && Ti.UI.createNotification({
			message : 'Tierstimmenarchiv importiert'
		}).show();
	}, 200);
	require('ui/tabgroup')();
}

