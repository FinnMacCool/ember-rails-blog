EmberBlog.CurrentUserController = Em.ObjectController.extend({
    isSignedIn: function() {
        this.get('content') != null
    }.property('content')
});
