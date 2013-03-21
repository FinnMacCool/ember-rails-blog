EmberBlog.PostEditRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor("post");
    },

    setupController: function(controller) {
        controller.startEditing();
    },

    exit: function() {
        this._super();
        this.controllerFor('post.edit').stopEditing();
    }
});