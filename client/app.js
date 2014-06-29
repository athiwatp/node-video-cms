'use strict';

angular
  .module('node-video-cms', [
    'ngRoute'
  ])

  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function ($location, $rootScope, $window) {
    // attach commonly used info to root scope to be available to all controllers/views
    var common = $rootScope.common = $rootScope.common || {
      active: {},
      title: 'Node Video CMS',
      logout: function () {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.localStorage.token;
        delete $window.localStorage.user;
        $window.location.replace('/signin.html');
      }
    };

  });