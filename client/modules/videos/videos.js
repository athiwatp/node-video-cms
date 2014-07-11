'use strict';

/**
 * Home module for displaying home page content
 */

angular
  .module('nodeVideoCMS.videos',[
    'ngRoute',
    'monospaced.elastic',
    'nodeVideoCMS.common',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/videos', {
        templateUrl: 'modules/videos/videos.html',
        controller: 'VideosCtrl'
      })
      .when('/videos/:categoryID', {
        templateUrl: 'modules/videos/videos.html',
        controller: 'VideosCtrl'
      })
  }]);