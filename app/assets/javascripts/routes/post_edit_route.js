EmberBlog.PostEditRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor("post");
    },

    setupController: function(controller) {
        this.controllerFor('categories.index').set('content', EmberBlog.Category.find());
        controller.startEditing();
    },

    deactivate: function() {
        this.controllerFor('post.edit').stopEditing();
    }
});