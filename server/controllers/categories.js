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
  var categories = yield mongo.categories.find()
    .sort({name: 1}).toArray();
  this.body = categories;
};