var preferences = require('../preferences').preferences;

exports.queries = {
    databaseUrl: preferences.databaseUrl,
    searchSize: preferences.searchResults,
    blogIndex: function() {
        return this.databaseUrl + 'blog/';
    },
    postType: function() {
        return this.blogIndex() + 'post/';
    },
    search: function() {
        return this.postType() + '_search';
    }
};
