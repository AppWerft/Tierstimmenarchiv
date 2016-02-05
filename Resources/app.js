const COLOR = {
	LIGHTGREEN : '#D5E3CB',
	DARKGREEN : '#174122',
	BROWN : '#B87C25'
},
    DBNAME = 'TSA11';
/*
 *      intent.setAction(Intent.ACTION_VIEW);
        intent.setClassName("com.android.settings", "com.android.settings.InstalledAppDetails");
        intent.putExtra(appPkgName, packageName);
   
 * 
 */
/*
var intent = Ti.Android.createIntent({
	action : 'android.settings.ACTION_VIEW',
	className: "com.android.settings.InstalledAppDetails",
});
intent.addFlags(Ti.Android.FLAG_ACTIVITY_NEW_TASK);
intent.putExtra("com.android.settings.ApplicationPkgName", 'de.appwerft.tierstimmenarchiv');
Ti.Android.currentActivity.startActivity(intent);
*/
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
	}, 1000);
	console.log('Info:  tabgroup open ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈');
	require('ui/tabgroup')();
	console.log('Info:  tabgroup opened ≈≈≈≈≈≈≈≈≈≈≈≈≈≈');

}

