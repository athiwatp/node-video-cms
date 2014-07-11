'use strict';

/**
 * Watch module for displaying video
 */

angular
  .module('nodeVideoCMS.watch',[
    'ngRoute',
    'monospaced.elastic',
    'nodeVideoCMS.common'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/watch/:id', {
      templateUrl: '/modules/watch/watch.html',
      controller: 'WatchCtrl'
    });
  }]);
