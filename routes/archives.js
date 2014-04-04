var core = require('../core');

exports.getArchives = function(req, res) {
	return core.getArchives(req, res, false);
};
exports.getArchivesAPI = function(req, res) {
	return core.getArchives(req, res, true);
};
