var constants = require('../constants');
var request = require('request');
var helpers = require('../helpers');

exports.editPost = function(req, res) {
    var id = req.params.id;
    var url = constants.queries.postType() + id;
    request(url, function(error, response, body) {
        var parsed = JSON.parse(body);
        if (!parsed._source) return res.send(404);
        return res.render(constants.views.createPost, buildData(parsed));
    });
};

function buildData(parsed) {
    var item = {
        post: parsed._source.postHtml,
        title: parsed._source.title,
        postedBy: parsed._source.postedBy,
        id: parsed._id,
        postedOn: parsed._source.postedOn,
        tags: getTags(parsed._source.tags)
    };
    return item;
}

function getTags(tags) {
    return tags ? tags.join() : undefined;
}
