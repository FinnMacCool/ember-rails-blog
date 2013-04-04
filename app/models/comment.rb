class Comment < ActiveRecord::Base
  attr_accessible :approved, :post_id, :text, :user_id

  belongs_to :post
  belongs_to :user
  has_many :likes, as: :likable

  validates_presence_of :post_id
  validates_presence_of :text
end
