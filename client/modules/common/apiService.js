'use strict';

/**
 * Service for providing access to the backend APU via HTTP.
 */

angular.module('nodeVideoCMS.common').factory('api', function($rootScope, $http, $window) {
  var apiBase = '/api',
    api = {events: {}};

  //api http endpoints
  api.videos = {
    list: function(start, end, criteria) {
      var url = apiBase + '/videos';

      if(start !== undefined && end !== undefined) {
        url+= '/' + start + '-' + end;
      }

      if(criteria) {
        url += '/' + JSON.stringify(criteria);
      }

      return $http({
        method: 'GET',
        url: url
      });
    },
    get: function(id) {
      var url = apiBase + '/video/' + id;
      return $http({
        method: 'GET',
        url: url
      });
    }
  }

  api.categories = {
    list: function() {
      var url = apiBase + '/categories';
      return $http({
        method: 'GET',
        url: url
      });
    },
    get: function(id) {
      var url = apiBase + '/categories/' + id;
      return $http({
        method: 'GET',
        url: url
      });
    }
  }

  return api;

});