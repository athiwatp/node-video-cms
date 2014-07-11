'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.videos").controller("VideosCtrl", function($scope, $routeParams, api){
  var videosPerPage = 12,
    criteria;

  if($routeParams && $routeParams.categoryID) {
    criteria = {
      category : parseInt($routeParams.categoryID)
    }
  }

  api.videos.list(0, videosPerPage, criteria).success(function (videos) {
    $scope.videos = videos;
  });

  api.categories.list().success(function (categories) {
    $scope.categories = categories;
  });

  $scope.maxSize = 5;
  $scope.totalItems = 175;
  $scope.currentPage = 1;

  $scope.pageChanged = function() {
    var start = videosPerPage * ($scope.currentPage - 1),
        end = videosPerPage * $scope.currentPage;
    api.videos.list(start, end, criteria).success(function (videos) {
      $scope.videos = videos;
    });
  };

});
