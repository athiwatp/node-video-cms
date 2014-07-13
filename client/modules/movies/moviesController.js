'use strict';

/**
 * Home controller simply lists all the videos
 */

angular.module("nodeVideoCMS.movies").controller("MoviesCtrl", function($scope, api){
  var videosPerPage = 12,
    criteria;

  api.categories.list().success(function (categories) {
    angular.forEach(categories, function(category){
      if(category.name === 'Movies') {
        criteria = {
          category: parseInt(category.id)
        }
      }
      api.videos.list(0, videosPerPage, criteria).success(function (videos) {
        $scope.videos = videos;
      });
    });


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
