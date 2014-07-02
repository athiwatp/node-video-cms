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
  app.use(route.get('/api/categories', listCategories));
};

function *listCategories() {
  var categories = yield mongo.categories.find().toArray();
  this.body = categories;
};