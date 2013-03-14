class Comment < ActiveRecord::Base
  attr_accessible :content, :post_id, :user_id

  belongs_to :post
  belongs_to :user

  validates_presence_of :content
  validates_presence_of :post_id
end
