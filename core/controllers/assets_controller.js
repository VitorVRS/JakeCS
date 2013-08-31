var fs = require('fs')

AssetsController = {};

(function() {
	
	function js(file) {
		this.getResponse().setHeader('Content-Type', "application/javascript")
		asset.apply(this, ['js', arguments])
	}

	function css(file) {
		this.getResponse().setHeader('Content-Type', "text/css")
		asset.apply(this, ['css', arguments])
	}

	function img(file) {
		this.getResponse().setHeader('Content-Type', "image/" + file.substring(file.lastIndexOf('.')+1))
		asset.apply(this, ['img', arguments])
	}

	function asset(type, args) {

		var file = []

		for (a in args) {
			file.push(args[a]);
		}

		var DIR = GLOBAL.dir,
			filename = DIR.WEBROOT + DIR.DS + type + DIR.DS + file.join(DIR.DS);

		this.setView(filename)
	}

	function render(view) {
		viewFile = view || this.getView()
		if (fs.existsSync(viewFile)) {
			return fs.readFileSync(viewFile)
		} else {
			return null
		}
	}

	function startModel() {
		return null;
	}

	function getModel() {
		return null;
	}

	// Public actions
	css.public = true;
	js.public = true;
	img.public = true;

	App.import('controller', 'controllers');
	AssetsController = Controller.extend({
		js: js,
		css: css,
		img: img,
		getModel: getModel,
		startModel: startModel,
		render: render
	});

})()