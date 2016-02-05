var WikiImageModule = require('vendor/wikimedia.adapter');

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
	var WikiImage = new WikiImageModule(c.latin, {
		
		onprogress : function(_res) {
			if (!row.pb) {
				row.pb = Ti.UI.createProgressBar({
					left : 5,
					width : 90,
					top : 40,
					height : 30,
					min : 0,
					max : 1
				});
				row.add(row.pb);
				row.pb.show();
			}
			row.pb.setValue(_res.progress);
		},
		onload : function(_image) {
			row.pb && row.remove(row.pb);
			row.children[0].setImage(_image);
			row.children[0].setHeight(_image.height * 100 / _image.width);
			row.children[0].setWidth(100);

		}
	});

	console.log(WikiImage);
	return row;
};
