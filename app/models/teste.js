Teste = {};

(function(){

  function init() {
  	this._parent()
  	this.setTable('testes');
  }


  function teste() {
    console.log("TESTETSTSTESTESTESTYESTESTETSTESTETS")
  }
  
  App.import('model', 'models');

  Teste = Model.extend({
    teste: teste,
    init: init
  })

})()