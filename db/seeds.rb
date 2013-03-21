# Coding: UTF-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([{ email: "bla@blubb.com", name: "Bla", password: "ohfoobar", password_confirmation: "ohfoobar" }])

post_data = [
    { title: "First", body: "Text of first post", teaser: "Text of", user_id: 1 },
    { title: "Second", body: "Text of second post", teaser: "Text o", user_id: 1 },
    { title: "Third", body: "Text of third post", teaser: "Text", user_id: 1 },
    { title: "Fourth", body: "Text of fourth post", teaser: "Tex", user_id: 1 },
    { title: "Fifth", body: "Text of fifth post", teaser: "Te", user_id: 1 },
    { title: "Sixth", body: "Text of sixth post", teaser: "T", user_id: 1 }
]

post_data.each do |p|
  Post.create(p)
  sleep(1)
end

comments = Comment.create([
    {text: "Ein Kommentar.", post_id: 1},
    {text: "Noch einer.", post_id: 1},
    {text: "Und noch einer.", post_id: 1},
    {text: "Der hier gehört zum 2. Post.", post_id: 2}
])

tags = ActsAsTaggableOn::Tag.create([{name: "erster Post"}, {name: "langweilig"},
                                     {name: "kurzer Post"}, {name: "interessant"}])

taggings = ActsAsTaggableOn::Tagging.create([{tag_id: 1, taggable_id: 1, taggable_type: "Post", context: "tags"},
                                             {tag_id: 2, taggable_id: 1, taggable_type: "Post", context: "tags"},
                                             {tag_id: 2, taggable_id: 2, taggable_type: "Post", context: "tags"},
                                             {tag_id: 3, taggable_id: 2, taggable_type: "Post", context: "tags"},
                                             {tag_id: 3, taggable_id: 3, taggable_type: "Post", context: "tags"},
                                             {tag_id: 4, taggable_id: 3, taggable_type: "Post", context: "tags"}])