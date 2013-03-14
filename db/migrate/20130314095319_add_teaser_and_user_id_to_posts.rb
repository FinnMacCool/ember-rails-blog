class AddTeaserAndUserIdToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :teaser, :text, default: "", null: false
    add_column :posts, :user_id, :integer
  end
end
