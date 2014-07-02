'use strict';

angular.module("nodeVideoCMS", [
  'ngRoute',
  'nodeVideoCMS.common',
  'nodeVideoCMS.home'])
  .config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

  })
  .run(function ($location, $rootScope, $window, $route, api) {
    var common = $rootScope.common = $rootScope.common || {
      title : 'Node Video CMS'
    };
  });