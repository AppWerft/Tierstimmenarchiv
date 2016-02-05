var navigationWindow = navigationWindow;

exports.create = function(win) {
	if (!Ti.Android) {
		navigationWindow = Ti.UI.iOS.createNavigationWindow({
			window : win ? win :Ti.UI.createWindow({
				backgroundColor : 'transparent',
				title : 'Tierstimmenarchiv'
			}),
			width : Ti.UI.FILL
		});
		return navigationWindow;
	}
};

exports.open = function(newwin, animated) {
	if (Ti.Android) {
		newwin.open();
	} else {
		navigationWindow.openWindow(newwin, {
			animated : animated,
			duration : 0.2,

		});
	}
};

exports.close = function(win) {
	if (Ti.Android) {
		win.removeAllChildren();
		win.close();
		win = null;
	} else {
		win.removeAllChildren();
		win.close();
		win = null;
	}
};
