EmberBlog.PostsNewRoute = Ember.Route.extend({
    model: function() {
        return null;
    },

    setupController: function(controller) {
        controller.startEditing();
    },

    exit: function() {
        this._super();
        this.controllerFor('posts.new').stopEditing();
    }
});
