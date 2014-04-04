var request = require('request');
var helpers = require('../helpers');
var preferences = require('../preferences').preferences;
var constants = require('../constants');

exports.getRecentPosts = function(req, res, api) {
	var url = constants.queries.search();
	var pageNo = parseInt(req.params.page);
	var paginationSize = preferences.index.paginationSize;
	var headers = helpers.setHeaders(url, getRecentPostsQueryData(pageNo, paginationSize));

	request(headers, function(error, response, body) {
		var hasPosts = error || !body || body.error || body.hits.hits.length === 0 ? false : true;
		if (!hasPosts && !api) return res.redirect('/create');
		if (!hasPosts && api) return res.json(null);
		var total = body.hits.hits.length;
		var resultCount = paginationSize - 1;
		var results = body.hits;
		var common = {
			data: results.hits.slice(0, resultCount),
			pageNo: pageNo,
			total: total,
			preferences: preferences,
			index: preferences.index
		};
		var dataToRender = helpers.buildResponse(common);
		dataToRender.websiteName = require('../preferences').preferences.websiteName;
		if (api) return res.json(dataToRender);
		return res.render(constants.views.home, dataToRender);
	});
};

function getRecentPostsQueryData(pageNo, paginationSize) {
	var queryData = {
		sort: {
			postedOn: {
				order: "desc"
			}
		},
		fields: preferences.index.pageFields
	};
	return helpers.pagination.buildPaginationQuery(pageNo, paginationSize, queryData);
}
