EmberBlog.CategoryEditRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor("category");
    },

    setupController: function(controller) {
        controller.startEditing();
    },

    deactivate: function() {
        this.controllerFor('category.edit').stopEditing();
    }
});