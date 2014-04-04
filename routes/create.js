var constants = require('../constants');
var helpers = require('../helpers');
var slugs = require('slugs');
var request = require('request');
var queries = constants.queries;

exports.newPost = function(req, res) {
    return res.render(constants.views.createPost);
};

exports.addPost = function(req, res) {
    var postData = req.body;
    var secret = postData.secret;
    //check if the user is a contributor
    var contributor = helpers.getContributor.getRoleFromSecret(secret, constants.contributors);
    return contributor ? savePost(res, contributor, postData) : res.send(403);
};

function preparePostForSaving(postData, contributor) {
    postData["postedBy"] = contributor.details.name;
    postData["about"] = contributor.details.about ? contributor.details.about : contributor.details.website
    postData["postedOn"] = Date.now();
    delete postData["secret"];
    return postData;
}

function savePost(res, contributor, defaultData) {
    var postData = preparePostForSaving(defaultData, contributor);
    var titleSlug = slugs(postData.title);
    var url = queries.postType() + titleSlug.toLowerCase();
    var headers = helpers.setHeaders(url, postData);
    request(headers, function(error, response, body) {
        if (error) return res.send(500);
        return res.send({
            id: body._id
        }, 200);
    });
}
