(function() {
  'use strict';

  angular
    .module('activities')
    .controller('ActivityUploadController', ActivityUploadController);

  ActivityUploadController.$inject = ['$scope'];

  function ActivityUploadController($scope) {
    var vm = this;

    // Activity upload controller logic
    // ...

    init();

    function init() {
    }
  }
})();
