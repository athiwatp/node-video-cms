'use strict';

/**
 * Admin Home module for displaying home page content
 */

angular
  .module('nodeVideoCMSAdmin.home',[
    'ngRoute',
    'monospaced.elastic',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when("/admin",
      {
        templateUrl: "/admin/modules/home/home.html",
        controller: "AdminHomeCtrl"
      }
    ).when("/admin/index.html",
      {
        templateUrl: "/admin/modules/home/home.html",
        controller: "AdminHomeCtrl"
      }
    );
  }]);