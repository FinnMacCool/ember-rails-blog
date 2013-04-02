class Post < ActiveRecord::Base
  acts_as_ordered_taggable
  attr_accessible :body, :category_id, :teaser, :title#, :tag_list
  attr_protected nil

  belongs_to :category
  belongs_to :user
  has_many :comments
  has_many :likes, as: :likable

  validates_presence_of :body
  validates_length_of :teaser, {maximum: 500}
  validates_presence_of :teaser
  validates_presence_of :title

  default_scope order: 'posts.created_at DESC'
end
