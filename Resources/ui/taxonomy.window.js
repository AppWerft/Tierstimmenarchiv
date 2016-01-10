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
        $.list.data=[];
		TSA.getClasses().forEach(function(c) {
			var image = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, c.image).read();
			console.log(image.width + 'x'+image.height);
			var row = Ti.UI.createTableViewRow({
				height : Ti.UI.SIZE,
				hasChild : true,
				itemId : c.latin
			});
			row.add(Ti.UI.createImageView({
				image :image,
				top : 10,
				//defaultImage : '/assets/default.png',
				bottom : 10,
				left : 5,
				width : 100,
				height : image.height/image.width*100
			}));
			row.add(Ti.UI.createLabel({
				left : 120,
				text : c.latin,
				color : COLOR.BROWN,
				font : {
					fontSize : 22,
					fontWeight : 'bold'
				}
			}));
			$.list.appendRow(row);
		});
		$.list.addEventListener('click', function(_e) {
			require('ui/orders.window')(_e.row.itemId).open();
		});
	});
	return $;
};
