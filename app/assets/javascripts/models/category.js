EmberBlog.Category = DS.Model.extend({
    posts: DS.hasMany('EmberBlog.Post'),

    name: DS.attr('string'),

    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),

    htmlId: function() {
        return "category-" + this.get('clientId');
    }.property('clientId'),

    postCount: function() {
        return this.get('posts.length')
    }.property('posts')
});
