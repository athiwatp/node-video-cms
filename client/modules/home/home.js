'use strict';

/**
 * Home module for displaying home page content
 */

angular
  .module('nodeVideoCMS.home',[
    'ngRoute',
    'monospaced.elastic',
    'nodeVideoCMS.common',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when("/",
      {
        templateUrl: "modules/home/home.html",
        controller: "HomeCtrl"
      }
    );
  }]);