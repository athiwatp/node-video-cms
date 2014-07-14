'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.movies").controller("MoviesCtrl", function($scope, api){
  var videosPerPage = 12,
    criteria;

  $scope.maxSize = 5;
  $scope.currentPage = 1;
  $scope.paginationVisible = false;

  api.categories.list().success(function (categories) {
    angular.forEach(categories, function(category){
      if(category.name === 'Movies') {
        criteria = {
          category: parseInt(category.id)
        }
      }
      api.videos.list(0, videosPerPage, criteria).success(function (res) {
        $scope.totalItems = res.total_record_count;
        $scope.videos = res.records;
        $scope.paginationVisible = $scope.totalItems > videosPerPage;
      });
    });


  });

  $scope.pageChanged = function() {
    var start = videosPerPage * ($scope.currentPage - 1),
        end = videosPerPage * $scope.currentPage;
    api.videos.list(start, end, criteria).success(function (res) {
      $scope.videos = res.records;
    });
  };

});
