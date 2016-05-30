(function() {
  'use strict';

  angular
    .module('activities')
    .controller('ActivityUploadController', ActivityUploadController);

  ActivityUploadController.$inject = ['$scope', '$state', 'Authentication', 'activityResolve', 'SportsService'];

  function ActivityUploadController ($scope, $state, Authentication, activity, SportsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.activity = activity;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    // Connecting SportsService methods to this controller -> added by MLK
    vm.sports = SportsService.listSports();
    // Activity starting point used for marker in map
    $scope.startpoint = vm.activity.trackpoint[0].lat + ',' + vm.activity.trackpoint[0].lon;
    $scope.km = vm.activity.distance[0].km;
    $scope.m = vm.activity.distance[0].m;

    $scope.hours = vm.activity.duration[0].hours;
    $scope.minutes = vm.activity.duration[0].minutes;
    // Path for activity trackpoints
    $scope.pathway = vm.activity.trackpoint.map(function(point) {
      return [point.lat, point.lon];
    });
    //console.log(pathway);

    $scope.maxDate = new Date();

    // Remove existing Activity
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.activity.$remove($state.go('activities.list'));
      }
    }

    // Save Activity
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.activityForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.activity._id) {
        vm.activity.$update(successCallback, errorCallback);
      } else {
        vm.activity.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('activities.view', {
          activityId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
