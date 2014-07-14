'use strict';

/**
 * Home module for displaying home page content
 */

angular
  .module('nodeVideoCMS.movies',[
    'ngRoute',
    'monospaced.elastic',
    'nodeVideoCMS.common',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when("/movies",
      {
        templateUrl: "/modules/movies/movies.html",
        controller: "MoviesCtrl"
      }
    );
  }]);