module.exports = function(c) {
	var row = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		hasChild : true,
		itemId : c.latin
	});
	row.add(Ti.UI.createImageView({
		defaultImage : '/assets/default.png',
		top : 0,
		left : 0,
		width : 100,
		touchEnabled : false,
		height : 'auto'
	}));
	row.add(Ti.UI.createLabel({
		left : 120,
		text : c.latin,
		top : 10,
		color : COLOR.DARKGREEN,
		width : Ti.UI.FILL,
		textAlign : 'left',
		touchEnabled : false,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		}
	}));
	row.add(Ti.UI.createLabel({
		left : 120,
		top : 40,
		text : c.de,
		color : COLOR.BROWN,
		touchEnabled : false,
		width : Ti.UI.FILL,
		textAlign : 'left',
		height : Ti.UI.SIZE,
		font : {
			fontSize : 18,

		}
	}));
	require('vendor/wikimedia.adapter').getSpeciesImage(c.latin, function(_image) {
		row.children[0].setImage(_image);
		row.children[0].setHeight(_image.height * 100 / _image.width);
		row.children[0].setWidth(100);

	});
	return row;
};
