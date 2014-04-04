var helpers = require('../helpers');

exports.hasField = function(field, fields) {
    return fields.indexOf(field) > -1;
};

exports.preparePostSummaryAndDate = function(data, preferredSummaryLength) {
    data.forEach(function(item, index, arr) {
        item.fields.postHtml = helpers.getPostSummary(item.fields.postHtml, preferredSummaryLength);
        item.fields.postedOn = new Date(item.fields.postedOn).toDateString();
        return item;
    });
    return data;
};

exports.preparePostSummary = function(data, preferredSummaryLength) {
    data.forEach(function(item, index, arr) {
        item.fields.postHtml = helpers.getPostSummary(item.fields.postHtml, preferredSummaryLength);
        return item;
    });
    return data;
};

exports.preparePostDate = function(data) {
    data.forEach(function(item, index, arr) {
        item.fields.postedOn = new Date(item.fields.postedOn).toDateString();
        return item;
    });
    return data;
};
