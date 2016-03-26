(function () {
  'use strict';

  // Sports controller
  angular
    .module('sports')
    .controller('SportsController', SportsController);

  SportsController.$inject = ['$scope', '$state', 'Authentication', 'sportResolve'];

  function SportsController ($scope, $state, Authentication, sport) {
    var vm = this;

    vm.authentication = Authentication;
    vm.sport = sport;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Sport
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.sport.$remove($state.go('sports.list'));
      }
    }

    // Save Sport
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.sportForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.sport._id) {
        vm.sport.$update(successCallback, errorCallback);
      } else {
        vm.sport.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('sports.view', {
          sportId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
