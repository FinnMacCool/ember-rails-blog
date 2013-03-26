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
        var tagList = content.get('tagList');
        if (tagList) {
            if (typeof tagList == "string") {
                content.set('tagList', tagList.split(/\s*,\s*/).filter(function(str) { return str.length > 0 }).uniq());
            }
        }
        else {
            content.set('tagList', []);
        }
        console.log( "return", this.validate() );
        if (this.validate()) {
            Em.Logger.info(this.transaction);
            if (content.get('isDirty')) {
                content.on('didUpdate', this, 'transitionAfterSave');
                this.transaction.commit();
                this.transaction = null;
            }
            else {
                this.transaction.remove(content);
                this.transaction = null;
                this.transitionToRoute('post.index');
            }
        }
        else {
            alert('Invalid Data!');
        }
    },

    transitionAfterSave: function() {
        this.transitionToRoute('post.index');
        this.get('content').off('didUpdate', this, 'transitionAfterSave');
    },

    validate: function() {
        return this.validatePresenceOf('title') && this.validatePresenceOf('body') && this.validatePresenceOf('teaser') &&
            this.validateLengthOf('teaser', null, 500);
    },

    cancel: function() {
        this.stopEditing();
        this.transitionToRoute('post.index');
    },

    validatePresenceOf: function(attr) {
        var value = this.get('content.' + attr);
        return !(value === undefined || value === '');
    },

    validateLengthOf: function(attr, min, max) {
        var length = this.get('content.' + attr).length;
        return (isNaN(min) || length >= min) && (isNaN(max) || length <= max);
    }
});
