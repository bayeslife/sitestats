'use strict';

angular.module('webdata2App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sites', {
        url: '/sites',
        templateUrl: 'app/sites/sites.html',
        controller: 'SitesCtrl'
      });
  });
