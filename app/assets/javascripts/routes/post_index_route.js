EmberBlog.PostIndexRoute = Ember.Route.extend({
    model: function(params) {
        return this.modelFor("post");
    },

    setupController: function(controller) {
        this.controllerFor('comments.new').startEditing();
    },

    deactivate: function() {
        this.controllerFor('comments.new').stopEditing();
    }
});
