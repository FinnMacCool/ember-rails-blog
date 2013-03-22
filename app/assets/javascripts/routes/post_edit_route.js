EmberBlog.PostEditRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor("post");
    },

    setupController: function(controller) {
        controller.startEditing();
    },

    deactivate: function() {
        this.controllerFor('post.edit').stopEditing();
    }
});