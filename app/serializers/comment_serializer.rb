class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at

  has_one :post, embed: :ids
  has_one :user, embed: :ids
end
