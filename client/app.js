'use strict';

angular.module("nodeVideoCMS", [
  'ngRoute',
  'nodeVideoCMS.common',
  'nodeVideoCMS.home',
  'nodeVideoCMS.watch'
])
  .config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({
      redirect: '/'
    })

  })
  .run(function ($location, $rootScope, $window, $route, api) {
    var common = $rootScope.common = $rootScope.common || {
      title : 'Node Video CMS'
    };
  });