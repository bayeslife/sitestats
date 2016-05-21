'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket,distributionview,probability, bubbleview) {
    this.$http = $http;
    this.$scope = $scope;
    this.distributionview = distributionview;
    $scope.services = [{service: 'service'}];

    $scope.defaultDisplay=true;
    // this.awesomeThings = [];

    // $http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   socket.syncUpdates('thing', this.awesomeThings);
    // });

    $http.get('/api/stats/summary').then(response => {
      $scope.summary = response.data[0];  
    });

    $http.get('/api/stats/services/mostpopular').then(response => {
      $scope.services = response.data;  

       var dist = [];
       for(var i=0;i<$scope.services.length;i++){
          var service = $scope.services[i];
          dist.push({ band: i,
                      frequency: service.percent/100,
                      min: i,
                      max: i+2,
                      median: i,
                      service: service.service
          });
       }
       distributionview.render('#distributionview',dist,"Frequency of services used by selected websites");

       bubbleview.render('#bubbleview',dist,"Frequency of services used by selected websites");
     });
  }

  toggle(){
    this.defaultDisplay = !this.defaultDisplay;
    console.log(this.defaultDisplay);
  }

  searchSite(val) {
    return this.$http.get('/api/sites', {
        params: {
          sitename: val
        }
      }).then(function(response){
        return response.data.map(function(item){
          return item.site;
        });
      });
  }

  selectSite(site){
    this.selectedSite = site;
    this.$http.get('/api/stats/services?',{
        params: {
          site: site
        }
      }).then(response => {
        this.$scope.siteServices = response.data;  

        var dist = [];
         for(var i=0;i<this.$scope.siteServices.length;i++){
            var service = this.$scope.siteServices[i];
            dist.push({ band: i,
                        frequency: service.percent/100,
                        min: i,
                        max: i+2,
                        median: i,
                        service: service.service
            });
         }
         this.distributionview.clear('#distributionview-site-services');
         this.distributionview.render('#distributionview-site-services',dist,"Frequency of services used by "+site);


      })
  }

  searchService(val) {
    return this.$http.get('/api/services', {
        params: {
          service: val
        }
      }).then(function(response){
        return response.data.map(function(item){
          return item.service;
        });
      });
  }

  selectService(service){
    this.selectedService = service;
    this.$http.get('/api/siteservices',{
      params: {
        service: service
      }
    }).then(response => {
        this.$scope.serviceSites = response.data;  

        // var dist = [];
        //  for(var i=0;i<this.$scope.siteServices.length;i++){
        //     var service = this.$scope.siteServices[i];
        //     dist.push({ band: i,
        //                 frequency: service.percent/100,
        //                 min: i,
        //                 max: i+2,
        //                 median: i,
        //                 service: service.service
        //     });
        //  }
        //  this.distributionview.clear('#distributionview-service-sites');
        //  this.distributionview.render('#distributionview-service-sites',dist);
  
      })
  }

}

angular.module('webdata2App')
  .controller('MainController', MainController);

})();
