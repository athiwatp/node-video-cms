'use strict';

angular.module("nodeVideoCMS", [
  'ngRoute',
  'nodeVideoCMS.common',
  'nodeVideoCMS.home',
  'nodeVideoCMS.search',
  'nodeVideoCMS.videos',
  'nodeVideoCMS.movies',
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
      title : 'Node Video CMS',
      active: {}
    },
    defaultTitle = 'Node Video CMS';

    $rootScope.searchText = '';
    $rootScope.searchVideos = function() {
      if($rootScope.searchText) {
        $location.url('/search/' + $rootScope.searchText);
      }
    }

    // set actions to be taken each time the user navigates
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

      console.log(current);

      // set page title
      if(current.$$route) {
        $rootScope.common.title = current.$$route.title || defaultTitle;

        // set active menu class for the left navigation (.sidenav)
        var currentCtrl = current.controller.substring(0, current.controller.indexOf('Ctrl')).toLowerCase();
        $rootScope.common.active[currentCtrl] = 'active';
        if (previous && previous.controller) {
          var previousCtrl = previous.controller.substring(0, previous.controller.indexOf('Ctrl')).toLowerCase();
          delete $rootScope.common.active[previousCtrl];
        }
      }
    });
  });