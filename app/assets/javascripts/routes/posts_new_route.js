EmberBlog.PostsNewRoute = Ember.Route.extend({
    model: function() {
        //return EmberBlog.Post.createRecord();
        return null;
    },
    /*
    setupController: function( controller, model ) {
        return this._super(),
            controller.set( 'content', model );
    }
    */

    setupController: function(controller) {
        controller.startEditing();
    },

    exit: function() {
        this._super();
        this.controllerFor('posts.new').stopEditing();
    }

});
