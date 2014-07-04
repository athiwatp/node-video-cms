'use strict';

/**
 * Videos controller for videos operations.
 */

var route = require('koa-route'),
  parse = require('co-body'),
  mongo = require('../config/mongo');

// register koa routes
exports.init = function (app) {
  console.log('videos init');
  app.use(route.get('/api/videos', listAllVideos));
  app.use(route.get('/api/videos/:start-:end', listVideos));
};

function *listAllVideos() {
  console.log(listAllVideos);
  var videos = yield mongo.videos.find(
    {},
    {limit: 12, skip: 0}
  ).toArray();
  this.body = videos;
};


function *listVideos(start, end) {
  console.log(listVideos);
  var videos = yield mongo.videos.find(
    {},
    {limit: end - start, skip: start}
  ).toArray();
  this.body = videos;
};
