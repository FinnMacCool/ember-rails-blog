class CategorySerializer < ActiveModel::Serializer

  attributes :id, :created_at, :can_create, :can_destroy, :can_update, :updated_at, :name

  has_many :posts, embed: :ids

  def can_create
    # `scope` is current_user
    Ability.new(scope).can?(:create, object)
  end

  def can_destroy
    Ability.new(scope).can?(:destroy, object)
  end

  def can_update
    Ability.new(scope).can?(:update, object)
  end
end