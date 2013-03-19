EmberBlog.TaggedController = Ember.ObjectController.extend({
    content: null,

    postsWithTag: function() {
        var posts = EmberBlog.Post.find({'tag_name': this.get('content')});
        return posts;
    }.property('@content')
});
