EmberBlog.CategoryEditController = Ember.ObjectController.extend({
    content: null,

    startEditing: function() {
        this.stopEditing();
        this.transaction = this.get('store').transaction();
        this.transaction.add(this.get('content'));
    },

    stopEditing: function() {
        if (this.transaction) {
            this.transaction.rollback();
            this.transaction = null;
        }
    },

    save: function() {
        if (this.validate()) {
            var content = this.get('content');
            if (content.get('isDirty')) {
                content.one('didUpdate', this, 'transitionAfterSave');
                this.transaction.commit();
                this.transaction = null;
            }
            else {
                this.transaction.remove(content);
                this.transaction = null;
                this.transitionToRoute('category.index');
            }
        }
        else {
            alert('Invalid Name!');
        }
    },

    transitionAfterSave: function() {
        this.transitionToRoute('category.index');
    },

    validate: function() {
        return this.validatePresenceOf('name');
    },

    cancel: function() {
        this.stopEditing();
        this.transitionToRoute('category.index');
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