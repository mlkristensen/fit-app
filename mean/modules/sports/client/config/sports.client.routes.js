(function () {
  'use strict';

  angular
    .module('sports')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('sports', {
        abstract: true,
        url: '/sports',
        template: '<ui-view/>'
      })
      .state('sports.list', {
        url: '',
        templateUrl: 'modules/sports/client/views/list-sports.client.view.html',
        controller: 'SportsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Sports List'
        }
      })
      .state('sports.create', {
        url: '/create',
        templateUrl: 'modules/sports/client/views/form-sport.client.view.html',
        controller: 'SportsController',
        controllerAs: 'vm',
        resolve: {
          sportResolve: newSport
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Sports Create'
        }
      })
      .state('sports.edit', {
        url: '/:sportId/edit',
        templateUrl: 'modules/sports/client/views/form-sport.client.view.html',
        controller: 'SportsController',
        controllerAs: 'vm',
        resolve: {
          sportResolve: getSport
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Sport {{ sportResolve.name }}'
        }
      })
      .state('sports.view', {
        url: '/:sportId',
        templateUrl: 'modules/sports/client/views/view-sport.client.view.html',
        controller: 'SportsController',
        controllerAs: 'vm',
        resolve: {
          sportResolve: getSport
        },
        data:{
          pageTitle: 'Sport {{ articleResolve.name }}'
        }
      });
  }

  getSport.$inject = ['$stateParams', 'SportsService'];

  function getSport($stateParams, SportsService) {
    return SportsService.get({
      sportId: $stateParams.sportId
    }).$promise;
  }

  newSport.$inject = ['SportsService'];

  function newSport(SportsService) {
    return new SportsService();
  }
})();
