'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.search").controller("SearchCtrl", function($scope, $routeParams, $rootScope, api){
  var videosPerPage = 12,
    criteria;

  if($routeParams && $routeParams.searchText) {
    criteria = {
      video_title: $routeParams.searchText
    };

    $rootScope.searchText = $scope.searchText = $routeParams.searchText;
  }

  api.videos.list(0, videosPerPage, criteria).success(function (videos) {
    $scope.videos = videos;
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
