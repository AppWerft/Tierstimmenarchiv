module.exports = function(label/*String*/, value/*String*/,children/*Boolean*/) {
	var row = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		hasChild : children ? true : false,
		itemId : (children ? JSON.stringify(children) : undefined),
		backgroundColor : COLOR.LIGHTGREEN
	});
	row.add(Ti.UI.createLabel({
		left : 10,
		text : label,
		top : 5,
		color : COLOR.DARKGREEN,
		width : Ti.UI.FILL,
		textAlign : 'left',
		touchEnabled : false,
		bubbleParent : true,
		height : Ti.UI.SIZE,
		font : {
			fontSize : 14,
			
		}
	}));
	row.add(Ti.UI.createLabel({
		left : 10,
		top : 20,
		bottom:5,
		text : value,
		color : COLOR.BROWN,
		touchEnabled : false,
		bubbleParent : true,
		width : Ti.UI.FILL,
		textAlign : 'left',
		height : Ti.UI.SIZE,
		font : {
			fontSize : 22,
			fontWeight : 'bold'

		}
	}));
	return row;
};
