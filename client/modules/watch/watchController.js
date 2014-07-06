'use strict';

/**
 * Watch controller for displaying video
 */

angular.module("nodeVideoCMS.watch").controller("WatchCtrl", function($scope, $routeParams, api){
  $scope.videoName = 'Madhu Video Example';
  console.log($routeParams);

  var videoID = $routeParams.id;

  api.videos.get(videoID).success(function (video) {
    $scope.video = video;
  });
});