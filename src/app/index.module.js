(function () {
  'use strict';

  angular
    .module('angularLobiadmin', [
      'ui.bootstrap.contextMenu',

      'app.core',

      'app.pages',

      'app.dashboard',
      'app.calendar',
      'angularFileUpload',
      'base64'
      'app.fileManager'
    ]);

})();
