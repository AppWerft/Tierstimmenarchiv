const COLOR = {
	LIGHTGREEN : '#D5E3CB',
	DARKGREEN : '#174122',
	BROWN : '#B87C25'
};

exports.animalsounds = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : COLOR.LIGHTGREEN
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'spectrogram',
		properties : {
			left : 0,
			touchEnabled : false,
			top : 0,
			width : 100,
			defaultImage : '/assets/default.png',
			height : 80,
			borderRadius : 3
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			left : 110,
			top : 5,
			bottom : 5,
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			layout : 'vertical'
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'deutscher_name',
			properties : {
				font : {
					fontSize : 20,
					fontFamily : 'Helvetica-Bold'
				},
				color : COLOR.BROWN,
				left : 0,
				top : 0,
				right : 15,
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'beschreibung',
			properties : {
				font : {
					fontSize : 14,
					fontFamily : 'Helvetica'
				},
				color : COLOR.BROWN,
				left : 0,
				top : 0,
				right : 25,
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'autor',
			properties : {
				font : {
					fontSize : 14,
					fontFamily : 'Helvetica-Bold'
				},
				color : COLOR.BROWN,
				left : 0,
				top : 0,
				right : 15,
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
			}
		}]
	}]
};
