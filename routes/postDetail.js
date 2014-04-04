var constants = require('../constants');
var request = require('request');

exports.postDetail = function(req, res) {
    var id = req.params.id;
    var url = constants.queries.postType() + id;
    request(url, function(error, response, body) {
        try {
            var parsed = JSON.parse(body);
            parsed._source.postedOn = new Date(parsed._source.postedOn).toDateString();
            parsed.websiteName = require('../preferences').preferences.websiteName;
            return res.render(constants.views.postDetail, parsed);
        } catch (e) {
            return res.send(404);
        }
    });
};
