'use strict';

/**
 * Watch controller for displaying video
 */

angular.module("nodeVideoCMS.watch").controller("WatchCtrl", function($scope, $routeParams, api){
  var videoID = $routeParams.id;

  api.videos.get(videoID).success(function (video) {
    $scope.video = video;
  });
});