'use strict';

angular.module('webdata2App.auth', [
  'webdata2App.constants',
  'webdata2App.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
