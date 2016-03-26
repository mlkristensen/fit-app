//Sports service used to communicate Sports REST endpoints
(function () {
  'use strict';

  angular
    .module('sports')
    .factory('SportsService', SportsService);

  SportsService.$inject = ['$resource'];

  function SportsService($resource) {
    return $resource('api/sports/:sportId', {
      sportId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      // Get list sports -> Added by MLK
      listSports: {
        method: 'GET',
        url: '/api/sports/listsports',
        isArray: true
      }
    });
  }
})();
