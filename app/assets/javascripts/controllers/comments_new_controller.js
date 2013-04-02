EmberBlog.CommentsNewController = Ember.ObjectController.extend({
    needs: ["currentUser", "postIndex"],

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

    save: function() {
        console.log( "return", this.validate() );
        if (!this.transaction) {
            //do nothing
        }
        else if (this.validate()) {
            var content = this.get('content');
            content.set('userId', this.get('controllers.currentUser.content.id'));
            content.set('post', this.get('controllers.postIndex.content'));
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
            this.transitionToRoute('post.index');
            this.get('controllers.postIndex.content.comments').update();
            this.startEditing();
        }
    }.observes('content.id'),

    validatePresenceOf: function(attr) {
        var value = this.get('content.' + attr);
        return !(value === undefined || value === '');
    },

    validateLengthOf: function(attr, min, max) {
        var length = this.get('content.' + attr).length;
        return (isNaN(min) || length >= min) && (isNaN(max) || length <= max);
    }
});
