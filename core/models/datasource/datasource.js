DataSource = {};

(function(){

	var client;

	function connect() {
		this.getClient().connect()
	}

	function setClient(c) {
		client = c
	}

	function getClient() {
		return client;
	}

	function fetchAll(sql) {
		this.getClient().query(sql, function() {
			
		})
	}

	function read(model, query) {
		var sql = 'SELECT * FROM ' + this.getSchema() + '.' + model.getTable() + ' WHERE 1=1 ';
		for (var i=0; i< query.length; i++) {
			sql += ' AND ' + query[i]
		}

		this.connect();

		var f = this.fetchAll(sql)

		this.getClient().end()

		return f;
	}

	DataSource = Obj.extend({
		connect: connect,
		setClient: setClient,
		getClient: getClient,
		fetchAll: fetchAll,
		read: read
	})


})()