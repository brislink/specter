var commonHelpers = require('./prepareResponseHelpers');
var helpers = require('../helpers');

exports.buildResponse = function(common) {
	var pageNo = common.pageNo;
	var preferences = common.preferences;
	var prefrenceIndex = common.index;
	var items = {};
	items.hits = prepareResponse(common.data, prefrenceIndex);
	items.hasPrevious = helpers.pagination.hasPrevButton(pageNo);
	items.hasNext = helpers.pagination.hasNextButton(pageNo, common.total, prefrenceIndex.paginationSize);
	items.isFirstPage = helpers.pagination.isFirstPage(items.hasPrevious);
	return items;
};

function prepareResponse(data, preferences) {
	var summaryLength = preferences.summaryLength;
	var hasField = commonHelpers.hasField;
	var fields = preferences.pageFields;
	var hasFieldPostHtml = hasField("postHtml", fields);
	var hasFiledPostedOn = hasField("postedOn", fields);
	if (hasFieldPostHtml && summaryLength > 0 && hasFiledPostedOn) {
		commonHelpers.preparePostSummaryAndDate(data, summaryLength);
	}
	if (hasFieldPostHtml && summaryLength > 0 && !hasFiledPostedOn) {
		commonHelpers.preparePostSummary(data, summaryLength);
	}
	if (hasFiledPostedOn) {
		commonHelpers.preparePostDate(data);
	}
	return data;
};
