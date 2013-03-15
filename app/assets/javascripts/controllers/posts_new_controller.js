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
        console.log( "return", this.validate() );
        if (this.validate()) {
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

    transitionAfterSave: function() {
        if (this.get('content.id')) {
            this.transitionToRoute('posts.index');
        }
    }.observes('content.id'),

    cancel: function() {
        this.stopEditing();
        this.transitionToRoute('posts.index');
    },

    addFramework: function() {
        this.get('content.frameworks').createRecord();
    },

    removeFramework: function(framework) {
        framework.deleteRecord();
    }
});