EmberBlog.PostIndexRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor("post");
    }
});
