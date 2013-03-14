class PostSerializer < ActiveModel::Serializer


  attributes :id, :created_at, :updated_at, :body, :title, :teaser, :tag_list
  has_many :comments, embed: :ids, :include => true
  has_one :user, embed: :ids
end
