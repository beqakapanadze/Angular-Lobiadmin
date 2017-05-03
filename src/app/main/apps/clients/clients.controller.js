(function () {
  'use strict';

  angular
      .module('app.clients')
      .controller('ClientsController', ClientsControllerFn);

  /** @ngInject */
  function ClientsControllerFn(Clients){
    var vm = this;

    // Data
    vm.name = "Zurmondi";
    vm.clients = Clients.data;

    // Methods


    init();

    ///////////

    function init(){



    }
  }
})();
