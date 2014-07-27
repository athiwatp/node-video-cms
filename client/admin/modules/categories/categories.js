'use strict';

/**
 * Admin Categories module for displaying home page content
 */

angular
  .module('nodeVideoCMSAdmin.categories',[
    'ngRoute',
    'monospaced.elastic',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when("/admin/categories",
      {
        templateUrl: "/admin/modules/categories/categories.html",
        controller: "CategoriesCtrl"
      }
    );
  }]);