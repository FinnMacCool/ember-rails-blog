EmberBlog.PostsNewRoute = Ember.Route.extend({
    model: function() {
        return null;
    },

    setupController: function(controller) {
        controller.startEditing();
    },

    deactivate: function() {
        this.controllerFor('posts.new').stopEditing();
    }

});
