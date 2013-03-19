EmberBlog.TaggedRoute = Ember.Route.extend({
    model: function(params) {
        Em.Logger.info( params );

        var tag = params.tag_name;
        return tag;
    }
});
