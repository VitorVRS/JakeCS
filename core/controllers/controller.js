Controller = {};

(function(){

	var view;

	var name;

	var modelName;

	var autoRender = true;

	var response;

	var request;

	var viewVars = {};

	var layout = 'default';

	var model;

	function init() {

	}

	function before() {

	}

	function render(view) {
		var fs = require('fs'),
			DS = GLOBAL.dir.DS,
			viewFile = view || this.getView(),
			file = GLOBAL.dir.APP + DS + 'views' + DS + name + DS + viewFile + '.jtp',
			layout = GLOBAL.dir.APP + DS + 'views' + DS + 'layouts' + DS + this.getLayout() + '.jtp'

		var layoutSource = fs.readFileSync(layout, 'utf8');


		if (!this.getViewVars()['title_for_layout']) {
			this.set('title_for_layout', viewFile.ucfirst())
		}

		if (!this.getViewVars()['action']) {
			this.set('action', viewFile.ucfirst())
		}

		try {

			viewSource = fs.readFileSync(file, 'utf8')

		} catch (e) {
			// View file not found
			var error404File = GLOBAL.dir.APP + DS + 'views' + DS + 'errors' + DS + '404' + '.jtp',
					viewSource = fs.readFileSync(error404File, 'utf8');

			this.set('message', 'View file ' + viewFile + '.jtp not found.')
		}

		Handlebar.registerPartial('content_for_layout', viewSource)

		var template  = Handlebar.compile(layoutSource)

		return template(this.getViewVars())
	}

	function getViewVars() {
		return viewVars;
	}

	function setName(n) {
		name = n
	}

	function getName() {
		return name;
	}

	function getView() {
		return view
	}

	function setView(v) {
		view = v;
	}

	function setLayout(l) {
		layout = l;
	}

	function getLayout() {
		return layout;
	}

	function setAutoRender(v) {
		autoRender = v;
	}

	function isAutoRender() {
		return autoRender;
	}

	function setResponse(r) {
		response = r;
	}

	function getResponse() {
		return response
	}

	function getRequest() {
		return request
	}

	function setRequest(r) {
		request = r
	}

	function startModel() {
		if (this.getModelName()) {
			App.import(modelName.toLowerCase(), 'models')

			try {
				return model = new __self[modelName]()
			} catch(e) {
				console.log(e)
				if (e.name != 'Error') {
					throw e;
				}

				throw Error('Missing model ' + modelName.ucfirst() + ' on ' + '/models/' + modelName.toLowerCase() + '.js')
			}
		}
	}

	function getModel() {
		return model
	}

	function setModelName(m) {
		modelName = m
	}

	function getModelName() {
		return modelName
	}

	function set(k,v) {
		viewVars[k] = v
	}

	Controller = Obj.extend({
		init: init,
		render: render,
		before: before,
		setName: setName,
		getName: getName,
		setView: setView,
		getView: getView,
		isAutoRender: isAutoRender,
		setAutoRender: setAutoRender,
		setResponse: setResponse,
		getResponse: getResponse,
		getRequest: getRequest,
		setRequest: setRequest, 
		startModel:startModel,
		getModelName: getModelName,
		setModelName: setModelName,
		getModel: getModel,
		getViewVars: getViewVars,
		getLayout: getLayout,
		setLayout: setLayout,
		set: set
	});

})()