App = Obj.extend({

	import: function(klass, folder) {
		var file,
			DS = GLOBAL.dir.DS;
		try {
			file = require(GLOBAL.dir.APP + DS + folder + DS + klass)
		} catch(e) {
			try {
				file = require(GLOBAL.dir.CORE + DS + folder + DS + klass)
			} catch(e) {
				throw new Error('Class not found')
			}
		}

		return file
	}

})