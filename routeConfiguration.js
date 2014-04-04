var routes = require('./routes');

exports.defineRoutes = function(app) {
	// Reserved routes
	app.get('/create', routes.create.newPost);
	app.get('/search', routes.search.deepSearch);

	// Routes for API
	app.get('/api/posts/recent/:page', routes.recentPosts.getRecentPostsAPI);
	app.get('/api/posts/recent', routes.recentPosts.getRecentPostsAPI);
	app.get('/api/posts/archives', routes.archives.getArchivesAPI);
	app.get('/api/posts/:tag', routes.tags.getTaggedPostsAPI);
	app.get('/api/posts/:tag/:page', routes.tags.getTaggedPostsAPI);

	// GET Routes
	app.get('/blog/archives', routes.archives.getArchives);
	app.get('/feed/:type', routes.feeds.getFeeds);
	app.get('/page/:page', routes.recentPosts.getRecentPosts);
	app.get('/tag/:tag', routes.tags.getTaggedPosts);
	app.get('/tag/:tag/:page', routes.tags.getTaggedPosts);
	app.get('/:id/edit', routes.edit.editPost);
	app.get('/:id/delete', routes.delete.getPostToDelete);
	app.get('/:id', routes.postDetail.postDetail);
	app.get('/', routes.recentPosts.getRecentPosts);

	// POST ROUTES
	app.post('/searchByTitle', routes.search.searchByTitle);
	app.post('/addpost', routes.create.addPost);
	app.post('/updatePost', routes.update.updatePost);
	app.post('/deletePost', routes.delete.deletePost);
	app.post('/search', routes.search.deepSearch);
	app.post('/api/search', routes.search.deepSearchAPI);
};
