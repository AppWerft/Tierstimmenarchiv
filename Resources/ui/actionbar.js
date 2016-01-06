var АктйонБар = require('com.alcoapps.actionbarextras');
module.exports = function(_event) {
    var activity = _event.source.getActivity();
    АктйонБар.setTitle('Amphibienzähler');
    АктйонБар.setFont('Helvetica-Bold');
    
	АктйонБар.setSubtitle('Zähler');
    activity.onCreateOptionsMenu = function(_menuevent) {
        _menuevent.menu.clear();
    
    _menuevent.menu.add({
		title : 'Suche',
		itemId : 46,
		icon : Ti.App.Android.R.drawable.ic_action_search,
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	}).addEventListener("click", require('ui/search.window'));
	
    _menuevent.menu.add({
                    title : 'Froschstimmenarchiv',
                    itemId : 2,
                    icon:Ti.App.Android.R.drawable.ic_action_frog,
                 showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
        }).addEventListener("click", function(){
        	require('ui/frogsounds.window')().open();
     });
    
    _menuevent.menu.add({
                    title : 'Bestimmung',
                    itemId : 2,
                    icon:Ti.App.Android.R.drawable.ic_action_dicho,
                 showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
        }).addEventListener("click", function(){
        	require('ui/dicho.window')().open();
    });
    
    _menuevent.menu.add({
                    title : 'Zählerverwaltung',
                    itemId : 1,
                    icon:Ti.App.Android.R.drawable.ic_action_counter,
                 showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
        }).addEventListener("click", function(){
        	require('ui/counteradmin')().open();
        	
        });
    }  	
        	activity.invalidateOptionsMenu();
        	activity.actionBar.onHomeIconItemSelected = function() {
           !_event.source.displayHomeAsUp && _event.source.close();
        };
};
