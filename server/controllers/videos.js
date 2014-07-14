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
  app.use(route.get('/api/videos', listVideos));
  app.use(route.get('/api/videos/:start-:end', listVideos));
  app.use(route.get('/api/videos/:start-:end/:criteria', listVideos));
  app.use(route.get('/api/video/:id', getVideo));
};


function *listVideos(start, end, criteria) {
  var projection = {};

  if(!criteria) {
    criteria = {};
  } else {
    criteria = JSON.parse(decodeURIComponent(criteria));

    for(var condKey in criteria) {
      if(condKey === 'searchText') {
        criteria = {
          $or : [{
            video_title : new RegExp(criteria[condKey], 'i')
          }, {
            description : new RegExp(criteria[condKey], 'i')
          }]
        }

        break;
      }
    }
  }

  if(start !== undefined && end !== undefined) {
    projection = {
      limit: end - start,
      skip: start
    };
  }

  var videosCursor = mongo.videos.find(
    criteria,
    projection
  );
  var count = yield videosCursor.count();
  var videos = yield videosCursor.toArray();
  this.body = {
    total_record_count : count,
    records : videos
  };
};

function *getVideo(id) {
  console.log('getVideo - ' + id);
  var video = yield mongo.videos.find(
    {_id: ObjectID(id)}
  ).toArray();
  this.body = (video && video.length) ? video[0] : undefined;
};