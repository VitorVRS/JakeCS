
var Class = require('class.js')
Obj = Class({
  init: function(){}
})

Handlebar = require('handlebars');
__self = GLOBAL

var connect = require('connect');

require('./paths')


var DIR = GLOBAL.dir,
    DS  = DIR.DS

require(DIR.CORE + DS + 'App');
App = new App()

var app = connect()
  .use(connect.favicon(DIR.WEBROOT + DS + 'favicon.ico'))
  .use(connect.logger('dev'))
  .use(connect.cookieParser())
  .use(connect.bodyParser())
  .use(connect.session({ secret: 'my secret here' }))
  .use(function(request, response){
    
    require(DIR.APP + DS)(request, response)

    response.end();
  });

connect.createServer(app).listen(1337);
console.log('Server running at port 1337')