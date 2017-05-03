(function () {
  'use strict';

  angular
    .module('app.clients', [])
    .config(Config);

  /** @ngInject */
  function Config($stateProvider, lobiNavigationServiceProvider) {

    $stateProvider
      .state('app.clients', {
        url: '/clients',
        views: {
          'content@app': {
            templateUrl: 'app/main/apps/clients/clients.html',
            controller: 'ClientsController as vm',
            resolve: {
              Clients: function($http){
                return $http.get('app/main/apps/clients/data/clients.json');
              }
            }
          }
        },
        bodyClass: 'app-clients'
      })
    ;

    lobiNavigationServiceProvider.saveItem('app.clients', {
      text: 'Clients',
      state: 'app.clients',
      weight: 1
    });
  }
})();
