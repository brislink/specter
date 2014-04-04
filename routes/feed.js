var feedBuilder = require('feed');
var request = require('request');
var preferences = require('../preferences').preferences;
var helpers = require('../helpers');
var constants = require('../constants');
var feedPref = preferences.feed;

exports.getFeeds = function(req, res) {
	var type = req.params.type;
	var url = constants.queries.search();
	var headers = helpers.setHeaders(url, getRecentFeedsQuery());
	var atomPreferred = feedPref.atom;
	var rssPreferred = feedPref.rss;
	if (!(rssPreferred || atomPreferred)) return res.send(404);
	request(headers, function(error, response, body) {
		if (error || body.error) return res.send(500);
		var feed = buildFeed();
		buildResponse(body.hits.hits, feed);
		if (type === 'rss' && rssPreferred) {
			res.set('Content-type', 'application/rss+xml');
			return res.send(feed.render('rss-2.0'));
		}
		if (type === 'atom' && atomPreferred) {
			res.set('Content-type', 'application/atom+xml');
			return res.send(feed.render('atom-1.0'));
		}
		return res.send(404);
	});
};

function buildFeed() {
	var feed = new feedBuilder({
		title: feedPref.title,
		description: feedPref.description,
		link: feedPref.link,
		author: feedPref.author
	});
	return feed;
}

function getRecentFeedsQuery() {
	var queryData = {
		sort: {
			postedOn: {
				order: "desc"
			}
		},
		fields: ['postedOn', 'title', 'postedBy', 'postHtml'],
		from: 0,
		size: feedPref.paginationSize
	};
	return queryData;
}

function buildResponse(data, feed) {
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		feed.item({
			title: item.fields.title,
			link: feedPref.link + item._id,
			description: helpers.getPostSummary(item.fields.postHtml, feedPref.summaryLength),
			author: [{
					name: item.fields.postedBy,
				},
			],
			date: new Date(item.fields.postedOn)
		});
	}
}
