'use strict';

angular.module("nodeVideoCMSAdmin", [
  'ngRoute',
  'nodeVideoCMSAdmin.home'
])
  .config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.otherwise({
      redirect: '/admin/'
    })
  })
  .run(function ($location, $rootScope, $window, $route) {

    // if user logs in with oauth, user token will be in query string so look for it. otherwise, check browser storage for token
    var tokenParamMatch = RegExp('[?&]user=([^&]*)').exec(window.location.search),
      tokenParam = tokenParamMatch && decodeURIComponent(tokenParamMatch[1].replace(/\+/g, ' '));
    if (tokenParam) {
      var data = JSON.parse(tokenParam);
      window.localStorage.token = data.token;
      window.localStorage.user = JSON.stringify(data.user);
    }

    var userString = $window.sessionStorage.user || $window.localStorage.user,
      common = $rootScope.common = $rootScope.common || {
        title : 'Node Video CMS',
        active: {},
        user: userString ? JSON.parse(userString) : undefined,
        username: '',
        password: '',
        remeberMe: true,
        signIn: function() {
          $.ajax({
            type: 'POST',
            url: '/signin',
            data: JSON.stringify({
              email: $rootScope.common.username,
              password: $rootScope.common.password
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
              var storage = $rootScope.common.remeberMe ? window.localStorage : window.sessionStorage;
              storage.token = data.token;
              storage.user = JSON.stringify(data.user);
              window.location.replace('/');
            },
            error: function (res) {
              $('form p.help-block').text(res.responseText);
            }
          });
        },
        signOut: function () {
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.user;
          delete $window.localStorage.token;
          delete $window.localStorage.user;
          $window.location.replace('/');
        },
        searchText:  '',
        searchVideos: function() {
          if(common.searchText) {
            $location.url('/search/' + common.searchText);
          }
        }
      },
      defaultTitle = 'Node Video CMS';

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