EmberBlog.Comment = DS.Model.extend({
    post: DS.belongsTo('EmberBlog.Post'),
    user: DS.belongsTo('EmberBlog.User'),

    text: DS.attr('string'),
    createdAt: DS.attr('date'),
    postId: DS.attr('number'),
    updatedAt: DS.attr('date'),
    userId: DS.attr('number'),

    htmlId: function() {
        return "comment-" + this.get('clientId');
    }.property('clientId')
});