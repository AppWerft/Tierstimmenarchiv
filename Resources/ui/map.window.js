module.exports = function(id) {

	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});

	var TSA = new (require('model/tsa.adapter'))();
	$.addEventListener('focus', function(_event) {
		var records = TSA.getRecordsWithLatLng();
	});
	return $;
};
