(function () {
  'use strict';

  describe('Sports Route Tests', function () {
    // Initialize global variables
    var $scope,
      SportsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SportsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SportsService = _SportsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('sports');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/sports');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          SportsController,
          mockSport;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('sports.view');
          $templateCache.put('modules/sports/client/views/view-sport.client.view.html', '');

          // create mock Sport
          mockSport = new SportsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Sport Name'
          });

          //Initialize Controller
          SportsController = $controller('SportsController as vm', {
            $scope: $scope,
            sportResolve: mockSport
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:sportId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.sportResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            sportId: 1
          })).toEqual('/sports/1');
        }));

        it('should attach an Sport to the controller scope', function () {
          expect($scope.vm.sport._id).toBe(mockSport._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/sports/client/views/view-sport.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SportsController,
          mockSport;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('sports.create');
          $templateCache.put('modules/sports/client/views/form-sport.client.view.html', '');

          // create mock Sport
          mockSport = new SportsService();

          //Initialize Controller
          SportsController = $controller('SportsController as vm', {
            $scope: $scope,
            sportResolve: mockSport
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.sportResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/sports/create');
        }));

        it('should attach an Sport to the controller scope', function () {
          expect($scope.vm.sport._id).toBe(mockSport._id);
          expect($scope.vm.sport._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/sports/client/views/form-sport.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SportsController,
          mockSport;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('sports.edit');
          $templateCache.put('modules/sports/client/views/form-sport.client.view.html', '');

          // create mock Sport
          mockSport = new SportsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Sport Name'
          });

          //Initialize Controller
          SportsController = $controller('SportsController as vm', {
            $scope: $scope,
            sportResolve: mockSport
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:sportId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.sportResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            sportId: 1
          })).toEqual('/sports/1/edit');
        }));

        it('should attach an Sport to the controller scope', function () {
          expect($scope.vm.sport._id).toBe(mockSport._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/sports/client/views/form-sport.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
