'use strict';

/**
 * Service for providing access to the backend APU via HTTP.
 */

angular.module('nodeVideoCMS.common').factory('api', function($rootScope, $http, $window) {
  var apiBase = 'api',
    api = {events: {}};

  //api http endpoints
  api.videos = {
    list: function() {
      return $http({
        method: 'GET',
        url: apiBase + '/videos'
      });
    }
  }

  return api;

});