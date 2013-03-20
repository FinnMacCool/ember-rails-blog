EmberBlog.TaggedController = Ember.ObjectController.extend({
    needs: "postsIndex",
    content: null,

    postsWithTag: function() {
        var posts = EmberBlog.Post.find({'tag_name': this.get('content')});
        console.log('blubb');
        return posts;
    }.property('@content', 'controllers.postsIndex.content.@each')
});
