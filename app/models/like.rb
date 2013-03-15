class Like < ActiveRecord::Base
  attr_accessible :likable_id, :likable_type, :user_id

  belongs_to :likable, polymorphic: true
  belongs_to :user
end
