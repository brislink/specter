var request = require('request');
var helpers = require('../helpers');
var constants = require('../constants');

exports.getArchives = function(req, res, api) {
    request(buildArchivesQuery(), function(error, response, body) {
        if (error || !body) res.send(500);
        var data = buildResponse(body.hits.hits);
        data.websiteName = require('../preferences').preferences.websiteName;
        if (api) return res.json(data);
        return res.render(constants.views.archives, data);
    });
};

function buildArchivesQuery() {
    var query = {
        fields: ["postedBy", "postedOn", "title", "wordCount", "tags"],
        size: 1000000,
        sort: {
            postedOn: {
                order: "asc"
            }
        },
        query: {
            match_all: {}
        }
    };
    var url = constants.queries.search();
    var headers = helpers.setHeaders(url, query);
    return headers;
}

function buildResponse(data) {
    var uniqueTags = [];
    data.forEach(function(item) {
        item.fields.postedOn = new Date(item.fields.postedOn).toDateString();
        var intersection = item.fields.tags.filter(function(tag) {
            return uniqueTags.indexOf(tag) < 0;
        });
        uniqueTags.push.apply(uniqueTags, intersection);
        return item;
    });
    return {
        archives: data,
        archiveTags: uniqueTags
    };
}
