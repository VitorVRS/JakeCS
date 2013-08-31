Database = {};

(function(){

	Database = Obj.extend({
		driver: 'postgres',
		host: '127.0.0.1',
		port: '5432',
		dbname: 'teste',
		schema: 'public',
		user: 'postgres',
		password: 'vitorvrs'
	})

})()