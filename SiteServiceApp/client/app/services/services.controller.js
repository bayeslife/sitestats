'use strict';

angular.module('webdata2App')
  .controller('ServicesCtrl', function ($http,$scope) {
    
  $http.get('/api/services').then(function(response){
        $scope.services =  response.data;        
   });


  });
