EmberBlog.PostsIndexRoute = Ember.Route.extend({
    model: function() {
        return EmberBlog.Post.find();
    }
});