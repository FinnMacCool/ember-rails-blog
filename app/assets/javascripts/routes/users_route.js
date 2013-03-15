EmberBlog.UsersRoute = Ember.Route.extend({
    model: function() {
        return EmberBlog.User.find();
    }
});