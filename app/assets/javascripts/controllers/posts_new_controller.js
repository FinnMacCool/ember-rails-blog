EmberBlog.PostsNewController = Ember.ObjectController.extend({
    needs: ["currentUser", "categories"],

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
        content.set('userId', this.get('controllers.currentUser.content.id'));
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
        if (this.get('content.id')) {
            this.transitionToRoute('post.index', this.get('content'));
        }
    }.observes('content.id'),

    cancel: function() {
        this.stopEditing();
        this.transitionToRoute('posts.index');
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