'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.home").controller("HomeCtrl", function($scope, api){
  // retrieve posts from server
  api.videos.list().success(function (videos) {
    $scope.videos = videos;
  });
});
