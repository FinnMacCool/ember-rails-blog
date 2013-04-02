EmberBlog.CategoriesIndexRoute = Ember.Route.extend({
    model: function() {
        return EmberBlog.Category.find();
    }
});