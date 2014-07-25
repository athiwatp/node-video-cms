'use strict';

/**
 * Admin Home module for displaying home page content
 */

angular
  .module('nodeVideoCMSAdmin.video',[
    'ngRoute',
    'monospaced.elastic',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when("/admin/addvideo",
      {
        templateUrl: "/admin/modules/videos/addVideo.html",
        controller: "AddVideoCtrl"
      }
    ).when("/admin/streamvideo",
      {
        templateUrl: "/admin/modules/videos/streamVideo.html",
        controller: "StreamVideoCtrl"
      }
    ).when("/admin/importvideo",
      {
        templateUrl: "/admin/modules/videos/importVideo.html",
        controller: "ImportVideoCtrl"
      }
    ).when("/admin/importfromuser",
      {
        templateUrl: "/admin/modules/videos/importFromUser.html",
        controller: "ImportFromUserCtrl"
      }
    ).when("/admin/embedvideo",
      {
        templateUrl: "/admin/modules/videos/embedVideo.html",
        controller: "EmbedVideoCtrl"
      }
    ).when("/admin/reportedvideos",
      {
        templateUrl: "/admin/modules/videos/reportedVideos.html",
        controller: "ReportedVideosCtrl"
      }
    ).when("/admin/approvevideos",
      {
        templateUrl: "/admin/modules/videos/approveVideos.html",
        controller: "ApproveVideosCtrl"
      }
    );
  }]);