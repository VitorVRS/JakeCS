TestesController = {};

(function(){

  var DIR = GLOBAL.dir;

  function init() {
    this._parent();
    this.setName('Teste');
    this.setModelName('Teste');
  }

  function index() {
    var testes = {Teste:[]}

    this.set('title_for_layout', 'Cadastro de Testes')

    for (a in arguments) {
      var act = "Linha " + arguments[a];

      testes['Teste'].push({
        column1: act,
        column2: act,
        column3: act
      })
    }

    this.getModel().read(1)

    this.set('testes', testes);
  }

  function edit(id) {
    var data = this.getRequest().body;
    
    if (data.data) {
      data.data.Teste.campo = 'Volta do form'
    } else {

      if (id) {
        // Read data from model??
        // this.getModel().read(id)
      }

      data.data = {
        Teste : {
          campo : 'TEste'
        }
      };

    }


    console.log(this.getRequest().body)
  }

  // Public actions
  index.public = true
  edit.public = true

  App.import('controller', 'controllers');
  TestesController = Controller.extend({
    index: index,
    edit: edit,
    init: init
  })

})()