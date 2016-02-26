var CanvasObject = require('com.wwl.canvas');

var LDF = Ti.Platform.displayCaps.logicalDensityFactor;
var CANVASHEIGHT = 320;
var MAXDURATION = 60000;
var TICK = 50;

var Widget = function() {
	this.canvasready = !1;
	this.tick=0;
	this.view = Ti.UI.createScrollView({
		scrollType : 'horizontal',
		width : Ti.UI.FILL,
		contentWidth : 3000,
		top : 0,
		height : CANVASHEIGHT / LDF,
		contentHeight : CANVASHEIGHT / LDF
	});
	this.canvas = CanvasObject.createCanvasView({
		backgroundColor : 'black',
		top : 0,
		left : 0,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
	});
	this.view.add(this.canvas);
	var that = this;
	this.canvas.addEventListener('load', function() {
		that.canvas.lineWidth = LDF;
		/* time grid: */
		for (var i = 0; i < MAXDURATION; i++) {
			if (i % (10000 / TICK) == 0) {
				that.canvas.strokeStyle = '#555555';
				that.canvas.beginPath();
				that.canvas.moveTo(i, CANVASHEIGHT);
				that.canvas.lineTo(i, 0);
				that.canvas.closePath();
				that.canvas.stroke();
			}
		}
		that.canvas.strokeStyle = '#3BFC34';
		that.canvas.antiAliasing = !0;
		that.canvasready = !0;
	});
	return this;
};

Widget.prototype = {
	createView : function() {
		return this.view;
	},
	drawLevel : function(level) {
		this.canvas.beginPath();
		this.canvas.moveTo(this.tick, CANVASHEIGHT / 2 - level * CANVASHEIGHT);
		this.canvas.lineTo(this.tick, CANVASHEIGHT / 2 + level * CANVASHEIGHT);
		this.tick = this.tick + LDF;
		this.canvas.closePath();
		this.canvas.stroke();
	}
};

module.exports = Widget;
