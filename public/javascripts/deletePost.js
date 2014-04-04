var deleteViewModel = function() {
    var self = this;
    self.secret = ko.observable();
    self.deleteEnabled = ko.computed(function() {
        return self.secret() ? true : false;
    });
    self.deletePost = function() {
        var data = self.getPostToDelete();
        $.post('/deletePost', data, function() {
            $("#deleteContainer").hide();
            $('body').html('<p class="lead" style="margin:20px;text-align:center;">The post was deleted. Click <a href="/">here</a> to go back</p>');
        }).fail(function(data) {
            if (data.status === 403) alert('un-authorized');
            if (data.status === 500) alert('internal server error');
        });
    };
    self.getPostToDelete = function() {
        var post = {};
        var data = $("#title").data();
        post.id = data.id;
        post.postedBy = data.by;
        post.secret = self.secret();
        return post;
    };
};

ko.applyBindings(new deleteViewModel());
