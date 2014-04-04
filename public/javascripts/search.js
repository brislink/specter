var searchViewModel = function() {
    var self = this;
    self.searchText = ko.observable();
    self.searchResults = ko.observableArray();
    self.keydown = function(data, event) {
        if (event.keyCode === 13) {
            self.deepSearch();
        }
        if (event.keyCode == 27) {
            self.searchText('');
            self.searchResults.removeAll();
        }
        return true;
    };
    self.deepSearch = function() {
        var url = '/search';
        var form = $('<form action="' + url + '" method="post">' +
            '<input type="text" name="query" value="' + self.searchText() + '" />' +
            '</form>');
        $('body').append(form);
        $(form).submit();
    };
    self.search = function() {
        var postData = {};
        var query = self.searchText();
        postData.query = query;
        $.post('/searchByTitle', postData, function(data) {
            self.searchResults(data);
        });
    };
    self.hasAppropriateLength = ko.computed(function(data, event) {
        var text = self.searchText();
        if (!text) return self.searchResults.removeAll();
        return text ? text.length >= 3 ? self.search() : false : false;
    });
};

ko.applyBindings(new searchViewModel());
