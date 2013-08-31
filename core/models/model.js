Model = {};

(function() {
	
	var db;

	var primaryKey;

	var table;

	function init() {

		db = getDatasource()
		setPrimaryKey('id')

		if (!this.getTable()) {}

	}

	function getDatasource() {
		App.import('postgres', 'models/datasource/drivers');

		return new this['Postgres']()
	}

	function read(id) {
		var query = [this.getPrimaryKey() + ' = ' + id]

		return db.read(this, query)
	}

	function getPrimaryKey() {
		return primaryKey;
	}

	function setPrimaryKey(i) {
		primaryKey = i
	}

	function getTable() {
		return table;
	}

	function setTable(t) {
		table = t;
	}

	Model = Obj.extend({
		init: init,
		read: read,
		getPrimaryKey: getPrimaryKey,
		setPrimaryKey: setPrimaryKey,
		getTable: getTable,
		setTable: setTable
	})

})()