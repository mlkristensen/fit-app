(function () {
  'use strict';

  // Activities controller
  angular
    .module('activities')
    .controller('ActivitiesController', ActivitiesController);

  ActivitiesController.$inject = ['$scope', '$state', 'Authentication', 'activityResolve', 'SportsService'];

  function ActivitiesController ($scope, $state, Authentication, activity, SportsService) {
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
    //vm.startpoint = vm.activity.trackpoint[0].lat + ',' + vm.activity.trackpoint[0].lon;

    // Path for activity trackpoints
    vm.activity.path = vm.activity.trackpoint.map(function(point) {
      return [point.lat, point.lon];
    });

    $scope.maxDate = new Date();

    $scope.thissporttype = SportsService.listSports()
      angular.forEach($scope.thissporttype, function(value, index){
        if(value._id === vm.activity._id){
          return true;
        }
        else{
          return false;
        }
        return (value._id.tostring());

      });


    $scope.thissporttypes = vm.sports.map(function(type){
      for (var sport in vm.sports) {
        console.log(sport);

        if(vm.sports.hasOwnProperty(key)){
          return (key + " -> " + vm.sports[key]);

        }
        else{
          return 'fejl på else';
        }
      }
    });

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
