var cheerio = require('cheerio');
var $ = cheerio.load();

exports.getContributor = require('./getUserRole');
exports.setHeaders = require('./setHeaders').setHeaders;
exports.authorization = require('./authorization');
exports.pagination = require('./pagination').pagination;
exports.buildResponse = require('./prepareResponse').buildResponse;
exports.getPostSummary = function(item, preferredSummaryLength) {
	item = $("<div></div>").html($(item.replace(/(\r\n|\n|\r)/gm, "")).slice(0, preferredSummaryLength)).html();
	return item;
};
