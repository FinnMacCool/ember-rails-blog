EmberBlog.TaggedRoute = Ember.Route.extend({
    model: function(params) {
        var tag = params.tag_name;
        return tag;
    }
});
