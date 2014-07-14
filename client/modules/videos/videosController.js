'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.videos").controller("VideosCtrl", function($scope, $routeParams, api){
  var videosPerPage = 12,
    criteria;

  $scope.maxSize = 5;
  $scope.currentPage = 1;
  $scope.paginationVisible = false;

  if($routeParams && $routeParams.categoryID) {
    criteria = {
      category : parseInt($routeParams.categoryID)
    }
  }

  api.videos.list(0, videosPerPage, criteria).success(function (res) {
    $scope.totalItems = res.total_record_count;
    $scope.videos = res.records;
    $scope.paginationVisible = $scope.totalItems > videosPerPage;
  });

  api.categories.list().success(function (categories) {
    $scope.categories = categories;
  });


  $scope.pageChanged = function() {
    var start = videosPerPage * ($scope.currentPage - 1),
        end = videosPerPage * $scope.currentPage;
    api.videos.list(start, end, criteria).success(function (res) {
      $scope.videos = res.records;
    });
  };

});
