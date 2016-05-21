'use strict';

(function() {

class AdminController {

  constructor(User,$http, $scope) {
  	this.$http = $http;
  	this.$scope = $scope;
    // Use the User $resource to fetch all users
    this.users = User.query();

    this.getSites();

    this.getServiceAliases();
     
  }

  getSites() {
    this.$http.get('/api/sites').then(response => {
      this.sites = response.data;   
      console.log('Got Sites');   
    });
  }


  getServiceAliases() {
    this.$http.get('/api/servicealiases').then(response => {
      this.servicealiases = response.data;   
      console.log('Got Service Aliases');   
    });
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  addSite() { 
    var t = this;
    if (this.newSite) {
      var p = this.$http.post('/api/sites', { site: this.newSite });
      p.success(function(response){
        t.newSite = '';  
        t.getSites();
      });    
    }
  }

  deleteSite(site) {
    this.$http.delete('/api/sites/' + site.id).success(response => {
      this.getSites();
    })
  }

  addServiceAlias() { 
    var t = this;
    if (this.newService && this.newServiceAlias) {
      var p = this.$http.post('/api/servicealiases', { service: this.newService, alias: this.newServiceAlias });
      p.success(function(response){
        t.newService = '';  
        t.newServiceAlias = ''; 
        t.getServiceAliases();
      });    
    }
  }

  deleteServiceAlias(servicealias) {
    this.$http.delete('/api/servicealiases/' + servicealias.id).success(response => {
      this.getServiceAliases();
    })
  }

}

angular.module('webdata2App.admin')
  .controller('AdminController', AdminController);

})();
