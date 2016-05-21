'use strict';

angular.module('webdata2App')
  .controller('SitesCtrl', function ($http, $scope) {
    
    $http.get('/api/sites').then(function(response){
        $scope.sites =  response.data;        
      });

  });
