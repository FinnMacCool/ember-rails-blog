class CommentSerializer < ActiveModel::Serializer
  attributes :id, :approved, :text, :created_at, :updated_at

  has_one :post, embed: :ids
  has_one :user, embed: :ids
end
