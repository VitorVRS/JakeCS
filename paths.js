!(function() {

	var DS = '/',
		APP = __dirname + DS + 'app',
		APP_CONFIG = APP + DS + 'config',
		WEBROOT = APP + DS + 'webroot',

		CORE = __dirname + DS + 'core',
		CORE_CONFIG = CORE + DS + 'config'

	GLOBAL.dir = {
		DS: DS,
		APP: APP,
		APP_CONFIG: APP_CONFIG,
		WEBROOT: WEBROOT,
		CORE: CORE
	}

})()