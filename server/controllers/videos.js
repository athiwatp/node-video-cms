'use strict';

/**
 * Videos controller for videos operations.
 */

var route = require('koa-route'),
  parse = require('co-body'),
  mongo = require('../config/mongo'),
  ObjectID = mongo.ObjectID;

// register koa routes
exports.init = function (app) {
  console.log('videos init');
  app.use(route.get('/api/videos', listAllVideos));
  app.use(route.get('/api/videos/:start-:end', listVideos));
  app.use(route.get('/api/video/:id', getVideo));
};

function *listAllVideos() {
  var videos = yield mongo.videos.find(
    {},
    {limit: 12, skip: 0}
  ).toArray();
  this.body = videos;
};


function *listVideos(start, end) {
  var videos = yield mongo.videos.find(
    {},
    {limit: end - start, skip: start}
  ).toArray();
  this.body = videos;
};

function *getVideo(id) {
  console.log('getVideo - ' + id);
  var video = yield mongo.videos.find(
    {_id: ObjectID(id)}
  ).toArray();
  this.body = (video && video.length) ? video[0] : undefined;
};