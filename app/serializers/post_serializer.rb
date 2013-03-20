class PostSerializer < ActiveModel::Serializer


  attributes :id, :created_at, :can_create, :can_destroy, :can_update, :updated_at, :body, :title, :teaser, :tag_list
  has_many :comments, embed: :ids, :include => true
  has_one :user, embed: :ids

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
