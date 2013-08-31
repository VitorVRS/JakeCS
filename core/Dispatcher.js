Dispatcher = {};

(function() {

	var DIR = GLOBAL.dir

	var urlArr = [];

	var params = {
		controller: '',
		action: '',
		params: []
	}

	var host;

	var response;

	function dispatch(request, response) {

		urlArr = request.url.split('/').filter(function(v){return !!v});

		host = request.headers.host + '/';
		
		parseParams();

		try {

			var controller = getController()
			
			controller.set('base', 'http://' + host);

			controller.setResponse(response)
			controller.setRequest(request)
			controller.startModel()

			controller.set('request', request)
			
			var result = _invoke(controller);

			response.write(result)
			response.exitCode = 200

		} catch (e) {
			App.import('controller', 'controllers');

			controller = new Controller;
	 		controller.setName('errors');
			controller.set('message', e.message)

			controller.setView('500');
			
			if (e.name == 'Error') {
				controller.setView('404')
			}

			response.write(controller.render())
		}

	}


	function parseParams () {
		var url = {
				controller: 'pages',
				action: 'index'
			},
			count = 0;

		if (urlArr.length !== 0) {
			url.controller = urlArr[0];
			count++;

			if (urlArr.length >= 2) {
				url.action = urlArr[1]
				count++;
			}
		}

		if (count >= 2 ) {
			url.params = urlArr.slice(count, urlArr.length)
		}

		params = url;	
	}

	function getController () {
		var controller,
			name = params.controller.ucfirst() + 'Controller';

	 	try {

	 		App.import(params.controller + '_controller', 'controllers');

	 		controller = new this[name]()
	 		if (!controller.name) {
	 			controller.setName(params.controller)
	 		}
	 	} catch(e) {
	 		// Class not found
	 		throw new Error('Class ' + params.controller + ' does not found.')
	 	}

	 	return controller;
	}

	function _invoke (controller) {

		//Startup controller
		controller.setView(params.action)
		
		var output;

		try {

			if (!controller[params.action]) {
				throw new Error('Action not found')
			}

			if (controller[params.action].public !== true) {
				throw new Error('Action denied')
			}

			output = controller[params.action].apply(controller, params.params)

			if (!output && controller.isAutoRender()) {
					output = controller.render()
			}

		} catch (e) {
			if (e.name != 'Error') {
				throw e;
			}
			// Action not found
			throw new Error(controller.getName().ucfirst() + '::' + params.action + '() does not exists.')
		}

		return output;
	}

	
	Dispatcher = Obj.extend({
		dispatch: dispatch
	})

})()
