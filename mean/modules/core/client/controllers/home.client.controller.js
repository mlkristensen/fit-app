'use strict';

angular
  .module('core')
  .controller('HomeController', ['$scope', 'Authentication', 'Users', 'ActivitiesService',
  function ($scope, Authentication, Users, ActivitiesService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var vm = this;

    // Call the function in service -> Added by MLK
    $scope.numberOfActivities = ActivitiesService.countActivities();

    $scope.numberOfUsers = Users.countUsers();


  }
]);
