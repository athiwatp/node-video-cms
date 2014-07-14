'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.home").controller("HomeCtrl", function($scope, api){
  var videosPerPage = 12;
  $scope.maxSize = 5;
  $scope.currentPage = 1;
  $scope.paginationVisible = false;

  api.videos.list(0, videosPerPage).success(function (res) {
    $scope.totalItems = res.total_record_count;
    $scope.videos = res.records;
    $scope.paginationVisible = $scope.totalItems > videosPerPage;
  });

  $scope.pageChanged = function() {
    var start = videosPerPage * ($scope.currentPage - 1),
        end = videosPerPage * $scope.currentPage;
    api.videos.list(start, end).success(function (res) {
      $scope.videos = res.records;
    });
  };

});
