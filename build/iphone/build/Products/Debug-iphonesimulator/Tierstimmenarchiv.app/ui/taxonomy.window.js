module.exports = function(id) {
	var $ = Ti.UI.createWindow({
		backgroundColor : COLOR.LIGHTGREEN
	});
	var TSA = new (require('model/tsa.adapter'))();
	$.list = Ti.UI.createTableView({
		top : 0,
	});
	$.add($.list);
	$.addEventListener('focus', function(_e) {
		if ($.list.data.length)
			return;
		$.list.data = TSA.getAllClasses().map(function(c) {
			var image = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, c.image).read();
			var row = Ti.UI.createTableViewRow({
				height : Ti.UI.SIZE,
				hasChild : true,
				itemId : c.latin
			});
			row.add(Ti.UI.createImageView({
				image : image,
				top : 10,
				//defaultImage : '/assets/default.png',
				bottom : 10,
				touchEnabled : false,
				left : 5,
				width : 100,
				height : image.height / image.width * 100
			}));
			row.add(Ti.UI.createLabel({
				left : 120,
				text : c.latin,
				touchEnabled : false,
				color : COLOR.BROWN,
				font : {
					fontSize : 22,
					fontWeight : 'bold'
				}
			}));
			return row;
		});

	});
	$.list.addEventListener('click', function(_e) {
		console.log('clicked on ordo in classes ≈≈≈≈≈≈≈≈≈≈≈≈');
		require('ui/orders.window')(_e.row.itemId).open();
	});
	return $;
};
