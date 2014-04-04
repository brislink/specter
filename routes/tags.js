var core = require('../core');

exports.getTaggedPosts = function(req, res) {
	return core.getTaggedPosts(req, res, false);
};

exports.getTaggedPostsAPI = function(req, res) {
	return core.getTaggedPosts(req, res, true);
};
