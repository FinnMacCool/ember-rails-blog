EmberBlog.PostsNewController = Ember.ObjectController.extend({
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
        this.get('content').set('userId', 1);
        console.log( "return", this.validate2() );
        if (this.validate2()) {
            this.transaction.commit();
            this.transaction = null;
        }
        else {
            alert('Nome inválido');
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
        return true; //validatePresence('title');
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

    validatePresence: function(attr) {
        return !(this.get('content').get(attr) === undefined || this.get('content').get(attr) === '');
    }
});