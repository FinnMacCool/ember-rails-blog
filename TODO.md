# Ember-Blog Todos

## Models

- [x] Post
  - [ ] include pagination
- [x] Post/Like
- [x] Post/Comment
- [x] Post/Comment/Like
- [ ] Post/Comment/Gravatars
- [x] Tag (for Posts)
- [x] User
- [x] Role
- [ ] Role_User (?)

## Behaviour
 - [ ] Approve comments
 - [ ] No need to approve comments for known and trusted users
 - [x] Navigation to Posts with Tag
 - [ ] Top list of Posts (by comments / views)

## Technical Deps

- [x] ember-rails
- [x] jquery-rails
- [x] coffee
- [x] sass
- [x] ruby-debug19
- [x] ruby-debug-ide19
- [x] thin
- [x] therubyracer
- [x] haml
- [x] twitter-bootstrap
- [x] rspec
- [x] guard
- [x] rails-api
- [ ] emberjs in version 1.0 (latest RC if needed)
- [ ] phantomjs
- [ ] eventmachine
- [ ] i18n-js
- [x] gem "omniauth"
- [x] gem "omniauth-openid"
- [ ] gem "openid-redis-store"
- [x] gem "omniauth-facebook"
- [x] gem "omniauth-twitter"

## Later
- [ ] redis
- [ ] redis-rails
- [ ] sidekiq (http://mperham.github.com/sidekiq/)
- [ ] vestal_versions oder paper_trail
- [ ] travis
```yaml
language: ruby
rvm:
  - 1.9.3
before_script:
  - cp config/database.yml.sample config/database.yml
  - cp config/redis.yml.sample config/redis.yml
  - psql -c 'create database discourse_test;' -U postgres
  - rake db:migrate
script: 'rake spec && bundle exec guard-jasmine --server-timeout=60'
services:
  - redis-server
```