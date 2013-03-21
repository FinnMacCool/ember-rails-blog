EmberBlog.CommentsNewController = Ember.ObjectController.extend({
    //needs: currentUser,

    startEditing: function() {
        this.transaction = this.get('store').transaction();
        this.set('content', this.transaction.createRecord(EmberBlog.Comment, {}));
    },

    stopEditing: function() {
        if (this.transaction) {
            this.transaction.rollback();
            this.transaction = null;
        }
    },

    onSave: function(text, post) {
        var transaction = this.get('store').transaction();
        transaction.createRecord(EmberBlog.Comment, {text: text, userId: 1, postId: post.id});
        transaction.commit();
        transaction = null;
    },

    save: function() {
        var content = this.get('content');
        content.set('userId', 1);  //this.get('controllers.currentUser.content.id')
        console.log( "return", this.validate() );
        if (this.validate()) {
            this.transaction.commit();
            this.transaction = null;
        }
        else {
            alert('Invalid Data!');
        }
    },

    validate: function() {
        return this.validatePresenceOf('text') && this.validateLengthOf('text', null, 500);
    },

    transitionAfterSave: function() {
        if (this.get('content.id')) {
            this.transitionToRoute('posts.index');
        }
    }.observes('content.id'),

    validatePresenceOf: function(attr) {
        return !(this.get('content').get(attr) === undefined || this.get('content').get(attr) === '');
    },

    validateLengthOf: function(attr, min, max) {
        var length = this.get('content').get(attr).length;
        return (isNaN(min) || length >= min) && (isNaN(max) || length <= max);
    }
});
