'use strict';

describe('Controller: SitesCtrl', function () {

  // load the controller's module
  beforeEach(module('webdata2App'));

  var SitesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SitesCtrl = $controller('SitesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
