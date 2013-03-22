EmberBlog.PostIndexController = Ember.ObjectController.extend({
    content: null,

    onSave: function(text) {
        var transaction = this.get('store').transaction();
        transaction.createRecord(EmberBlog.Comment, {text: text, userId: 1, postId: 1});
        transaction.commit();
        transaction = null;
    }
});
