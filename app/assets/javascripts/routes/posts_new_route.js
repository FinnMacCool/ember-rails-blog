EmberBlog.PostsNewRoute = Ember.Route.extend({
    model: function() {
        return null;
    },

    setupController: function(controller) {
        this.controllerFor('categories.index').set('content', EmberBlog.Category.find());
        controller.startEditing();
    },

    deactivate: function() {
        this.controllerFor('posts.new').stopEditing();
    }

});
