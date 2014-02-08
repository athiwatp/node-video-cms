/**
 * Module dependencies.
 */
 
var views = require('co-views');

module.exports = views(__dirname + '/../public/views', {
	map: {html: 'swig'}
});