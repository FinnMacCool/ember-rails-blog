EmberBlog.Router.map(function() {
    // default index route to / loading index template
    this.resource("posts", function() { // implicit path and template name (same as route name)
        //this.route('index');
        this.route('new');
        this.resource('post', { path: '/:post_id' });
    });
    //this.route('posts.new', { path: '/posts/new' });
    //this.resource('post', { path: '/posts/:post_id' });
    this.resource("users", function() {

    });
    this.resource('user', { path: '/users/:user_id' });
    this.resource('tagged', { path: '/t/:tag_name' });
    this.route("about");
});

EmberBlog.reopen({
    location: 'history'
});