EmberBlog.CategoriesNewRoute = Ember.Route.extend({
    model: function() {
        return null;
    },

    setupController: function(controller) {
        controller.startEditing();
    },

    deactivate: function() {
        this.controllerFor('categories.new').stopEditing();
    }

});