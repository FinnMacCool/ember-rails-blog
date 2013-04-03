EmberBlog.CategoriesNewController = Ember.ObjectController.extend({

    startEditing: function() {
        this.transaction = this.get('store').transaction();
        this.set('content', this.transaction.createRecord(EmberBlog.Category, {}));
    },

    stopEditing: function() {
        if (this.transaction) {
            this.transaction.rollback();
            this.transaction = null;
        }
    },

    save: function() {
        if (this.validate()) {
            this.transaction.commit();
            this.transaction = null;
        }
        else {
            alert('Invalid Name!');
        }
    },

    validate: function() {
        return this.validatePresenceOf('name');
    },

    transitionAfterSave: function() {
        if (this.get('content.id')) {
            this.transitionToRoute('category.index', this.get('content'));
        }
    }.observes('content.id'),

    cancel: function() {
        this.stopEditing();
        this.transitionToRoute('categories.index');
    },

    validatePresenceOf: function(attr) {
        var value = this.get('content.' + attr);
        return !(value == undefined || value.trim() === '');
    },

    validateLengthOf: function(attr, min, max) {
        var length = this.get('content.' + attr).length;
        return (isNaN(min) || length >= min) && (isNaN(max) || length <= max);
    }
});