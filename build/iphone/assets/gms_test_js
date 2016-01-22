Ti.Map = require('ti.map');

module.exports = function() {
    var rc = Ti.Map.isGooglePlayServicesAvailable();
    if (rc != Ti.Map.SUCCESS) {
        var text = 'GooglePlayService ';
        switch (rc) {
        case Ti.Map.SERVICE_MISSING:
            text += 'ist nicht installiert.';
            break;
        case Ti.Map.SERVICE_VERSION_UPDATE_REQUIRED:
            text += 'ist nicht in aktueller Version.';
            break;
        case Ti.Map.SERVICE_DISABLED:
            text += 'ist abgeschaltet.';
            break;
        case Ti.Map.SERVICE_INVALID:
            text += 'kann sich nicht bei Google anmelden.';
            break;
        default:
            alert('Unbekannter Fehler.');
        }
        text += '\nDeswegen kann keine Karte angezeigt werden. Bitte installieren Sie die neueste Version von GMS.\n\nGegebenenfalls müssen Sie ein GoogleKonto anlegen.';
        var dialog = Ti.UI.createAlertDialog({
            message : text,
            ok : 'Ok',
            androidView : Ti.UI.createImageView({
                image : '/images/gms.png',
                width : Ti.UI.FILL,
                height : 'auto'
            }),
            title : 'Problem mit GoogleMaps'
        });
        dialog.show();
        dialog.addEventListener('click', function() {
            try {
                Ti.Android.currentActivity.startActivity(Ti.Android.createIntent({
                    action : Ti.Android.ACTION_VIEW,
                    data : "market://details?id=com.google.android.gms"
                }));
            } catch (e) {
            }
        });
    }
    // resultcode ==0 is positive
    return (rc == Ti.Map.SUCCESS) ? true : false;

};
