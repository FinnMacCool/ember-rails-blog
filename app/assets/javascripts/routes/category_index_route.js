EmberBlog.CategoryIndexRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor("category");
    }
});