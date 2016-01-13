module.exports = function() {
	var c = arguments[0];
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
		bubbleParent : true,
		touchEnabled : false,
		height : 'auto'
	}));
	row.add(Ti.UI.createView({
		top : 5,
		left : 110,
		layout : 'vertical'
	}));
	row.children[1].add(Ti.UI.createLabel({
		left : 0,
		text : c.latin,
		top : 0,
		color : COLOR.DARKGREEN,
		width : Ti.UI.FILL,
		textAlign : 'left',
		touchEnabled : false,
		bubbleParent : true,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 22,
			fontWeight : 'bold'
		}
	}));
	row.children[1].add(Ti.UI.createLabel({
		left : 0,
		top : 0,
		text : c.de,
		color : COLOR.BROWN,
		touchEnabled : false,
		bubbleParent : true,
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
