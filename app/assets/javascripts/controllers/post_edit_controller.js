EmberBlog.PostEditController = Ember.ObjectController.extend({
    //needs: currentUser,
    content: null,

    startEditing: function() {
        this.stopEditing();
        this.transaction = this.get('store').transaction();
        this.transaction.add(this.get('content'));
        Em.Logger.info(this.transaction);
    },

    stopEditing: function() {
        if (this.transaction) {
            this.transaction.rollback();
            this.transaction = null;
        }
    },

    save: function() {
        var content = this.get('content');
        if (content.get('tagList') == null) {
            content.set('tagList', "");
        }
        console.log( "return", this.validate() );
        if (this.validate()) {
            Em.Logger.info(this.transaction);
            this.transaction.commit();
            this.transaction = null;
        }
        else {
            alert('Invalid Data!');
        }
    },

    validate: function() {
        return this.validatePresenceOf('title') && this.validatePresenceOf('body') && this.validatePresenceOf('teaser') &&
            this.validateLengthOf('teaser', null, 500);
    },

    transitionAfterSave: function() {
        this.get('content').on('didUpdate', this, function() {
            this.transitionToRoute('post.index');
        })
    }.observes('content.stateManager.currentState.name'),

    cancel: function() {
        this.stopEditing();
        this.transitionToRoute('post.index');
    },

    validatePresenceOf: function(attr) {
        return !(this.get('content').get(attr) === undefined || this.get('content').get(attr) === '');
    },

    validateLengthOf: function(attr, min, max) {
        var length = this.get('content').get(attr).length;
        return (isNaN(min) || length >= min) && (isNaN(max) || length <= max);
    }
});