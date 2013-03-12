EmberBlog.CurrentUserController = Em.ObjectController.extend({
    isSignedIn: function() {
        return this.get('content') !== null
    }.property('@content')
});
