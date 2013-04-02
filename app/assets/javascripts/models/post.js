EmberBlog.Post = DS.Model.extend({
    category: DS.belongsTo('EmberBlog.Category'),
    user: DS.belongsTo('EmberBlog.User'),
    comments: DS.hasMany('EmberBlog.Comment'),

    body: DS.attr('string'),
    categoryId: DS.attr('number'),
    canCreate: DS.attr('boolean'),
    canDestroy: DS.attr('boolean'),
    canUpdate: DS.attr('boolean'),
    tagList: DS.attr('raw'),
    teaser: DS.attr('string'),
    title: DS.attr('string'),
    userId: DS.attr('number'),

    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),

    htmlId: function() {
        return "post-" + this.get('clientId');
    }.property('clientId'),

    formattedDate: function() {
        var d = this.get('createdAt').toDateString();
        return moment(d).format('MMMM D, YYYY');
    }.property('createdAt')
});

DS.RESTAdapter.registerTransform('raw', {
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});