PagesController = {};

(function(){

	var DIR = GLOBAL.dir;

	function init() {
		this._parent();
		this.setName('Pages');
		this.setModelName('Page');		
		this.set('title_for_layout', 'Menu Principal')
	}

	function index() {
		
	}

	//Public actions
	index.public = true;

	App.import('controller', 'controllers');
	PagesController = Controller.extend({
		index: index,
		init: init
	})

})()