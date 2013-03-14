class Post < ActiveRecord::Base
  acts_as_ordered_taggable
  attr_accessible :body, :teaser, :title#, :tag_list
  attr_protected nil

  has_many :comments
  belongs_to :user

  validates_presence_of :body
  validates_length_of :teaser, {maximum: 500}
  validates_presence_of :teaser
  validates_presence_of :title
end
