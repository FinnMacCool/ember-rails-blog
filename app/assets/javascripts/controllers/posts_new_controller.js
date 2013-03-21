EmberBlog.PostsNewController = Ember.ObjectController.extend({
    //needs: currentUser,

    startEditing: function() {
        this.transaction = this.get('store').transaction();
        this.set('content', this.transaction.createRecord(EmberBlog.Post, {}));
    },

    stopEditing: function() {
        if (this.transaction) {
            this.transaction.rollback();
            this.transaction = null;
        }
    },

    save: function() {
        var content = this.get('content');
        content.set('userId', 1);  //this.get('controllers.currentUser.content.id')
        if (content.get('tagList') == null) {
            content.set('tagList', "");
        }
        console.log( "return", this.validate2() );
        if (this.validate2()) {
            this.transaction.commit();
            this.transaction = null;
        }
        else {
            alert('Invalid Data!');
        }
    },

    validate: function() {
        var firstName, regex;
        regex = /^[A-ZÄÁÀËÉÈÍÌÖÓÒÚÙÑÇa-zäáàëéèíìöóòúùñç][A-ZÄÁÀËÉÈÍÌÖÓÒÚÙÑÇa-zäáàëéèíìöóòúùñç ]{1,70}[A-ZÄÁÀËÉÈÍÌÖÓÒÚÙÑÇa-zäáàëéèíìöóòúùñç]$/;
        firstName = this.get('content').get('firstName');
        firstNameOk = regex.exec(firstName);
        if (firstNameOk) {
            return true;
        }
        else {
            return false;
        }
    },

    validate2: function() {
        return this.validatePresenceOf('title') && this.validatePresenceOf('body') && this.validatePresenceOf('teaser') &&
            this.validateLengthOf('teaser', null, 500);
    },

    transitionAfterSave: function() {
        if (this.get('content.id')) {
            this.transitionToRoute('posts.index');
        }
    }.observes('content.id'),

    cancel: function() {
        this.stopEditing();
        this.transitionToRoute('posts.index');
    },

    validatePresenceOf: function(attr) {
        return !(this.get('content').get(attr) === undefined || this.get('content').get(attr) === '');
    },

    validateLengthOf: function(attr, min, max) {
        var length = this.get('content').get(attr).length;
        return (isNaN(min) || length >= min) && (isNaN(max) || length <= max);
    }
});