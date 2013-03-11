class UserSerializer < ActiveModel::Serializer
  embed :ids

  attributes :id, :email, :name, :created_at, :updated_at
  has_many :comments
end