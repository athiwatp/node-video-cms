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
  app.use(route.get('/api/videos', listVideos));
};

function *listVideos() {
  var videos = yield mongo.videos.find().toArray();
  this.body = videos;
};


