Postgres = {};

(function(){
	
	var pg = require('pg')

	var pgString;

	var schema;	

	function init() {
		App.import('database', 'config');
		dbConfig = new Database();

		pgString = 'tcp://' + dbConfig.user + ':' + dbConfig.password + '@' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbname
		
		this.setSchema(dbConfig.schema)

		this.setClient(new pg.Client(pgString))
	}

	function setSchema(s) {
		schema = s;
	}

	function getSchema () {
		return schema;
	}


	App.import('datasource', 'models/datasource');
	Postgres = DataSource.extend({
		init: init,
		setSchema: setSchema,
		getSchema: getSchema
	})

})()