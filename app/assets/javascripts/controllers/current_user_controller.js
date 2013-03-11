EmberBlog.CurrentUserController = Em.ObjectController.extend({
    isSignedIn: function() {
        @get('content') != null
    }.property('@content')
});
