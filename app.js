'use strict';

/**
 * Entry point for node-video-cms app.
 * Initiates database connection and starts listening for requests on configured port.
 */

var config = require('./server/config/config'),
    koaConfig = require('./server/config/koa'),
    mongo = require('./server/config/mongo'),
    mongoSeed = require('./server/config/mongo-seed'),
    co = require('co'),
    koa = require('koa'),
    app = koa();


module.exports = app;

app.init = co(function *() {
    // initialize mongodb and populate the database with seed data if empty
    yield mongo.connect();
    yield mongoSeed();

    // koa config
    koaConfig(app);

    // create http and websocket servers and start listening for requests
    app.server = app.listen(config.app.port);
    if (config.app.env !== 'test') {
        console.log('KOAN listening on port ' + config.app.port);
    }
});

// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
    app.init();
}


