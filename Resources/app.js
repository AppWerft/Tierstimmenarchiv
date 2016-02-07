const COLOR = {
	LIGHTGREEN : '#D5E3CB',
	DARKGREEN : '#174122',
	BROWN : '#B87C25'
},
    DBNAME = 'TSA11';

 var TSA = new (require('model/tsa.adapter'))();
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

