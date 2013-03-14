EmberBlog.Post = DS.Model.extend({
    user: DS.belongsTo('EmberBlog.User'),
    comments: DS.hasMany('EmberBlog.Comment'),

    body: DS.attr('string'),
    tagList: DS.attr('raw'),
    teaser: DS.attr('string'),
    title: DS.attr('string'),
    userId: DS.attr('number'),

    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),

    htmlId: function() {
        return "post-" + this.get('clientId');
    }.property('clientId')
});

DS.RESTAdapter.registerTransform('raw', {
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});