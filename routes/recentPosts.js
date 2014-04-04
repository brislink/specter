var core = require('../core');

exports.getRecentPosts = function(req, res) {
	return core.getRecentPosts(req, res, false);
};

exports.getRecentPostsAPI = function(req, res) {
	return core.getRecentPosts(req, res, true);
};
