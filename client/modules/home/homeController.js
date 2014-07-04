'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.home").controller("HomeCtrl", function($scope, api){
  // retrieve posts from server
  var videosPerPage = 12;

  api.videos.list(0, videosPerPage).success(function (videos) {
    $scope.videos = videos;
  });

  $scope.maxSize = 5;
  $scope.totalItems = 175;
  $scope.currentPage = 1;

  $scope.pageChanged = function() {
    var start = videosPerPage * ($scope.currentPage - 1),
        end = videosPerPage * $scope.currentPage;
    api.videos.list(start, end).success(function (videos) {
      $scope.videos = videos;
    });

    console.log('Page changed to: ' + $scope.currentPage);
    console.log('start: ' + start);
    console.log('end: ' + end);

  };

});
