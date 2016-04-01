(function () {
  'use strict';

  angular
    .module('sports')
    .controller('SportsListController', SportsListController);

  SportsListController.$inject = ['SportsService'];

  function SportsListController(SportsService) {
    var vm = this;

    vm.sports = SportsService.query();
  }
})();
