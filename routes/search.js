var core = require('../core');

exports.searchByTitle = function(req, res) {
	return core.search.searchByTitle(req, res);
};

exports.deepSearch = function(req, res) {
	return core.search.deepSearch(req, res, false);
};

exports.deepSearchAPI = function(req, res) {
	return core.search.deepSearch(req, res, true);
};
