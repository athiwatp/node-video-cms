'use strict';

/**
 * Search module for displaying search content
 */

angular
  .module('nodeVideoCMS.search',[
    'ngRoute',
    'monospaced.elastic',
    'nodeVideoCMS.common',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/search/:searchText',
      {
        templateUrl: "/modules/search/search.html",
        controller: "SearchCtrl"
      }
    );
  }]);