var DIR = GLOBAL.dir;

//INIT BOOTSTRAP
try {
	require(DIR.CORE + '/' + 'bootstrap.js');
	require(DIR.APP_CONFIG + '/' + 'bootstrap.js');
} catch (e) {
	console.log(e)
}

module.exports = function(request, response) {
	App.import('Dispatcher', '')

	var dispatcher = new Dispatcher();

	dispatcher.dispatch(request, response)
}