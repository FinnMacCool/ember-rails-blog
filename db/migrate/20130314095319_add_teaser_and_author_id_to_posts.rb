class AddTeaserAndAuthorIdToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :teaser, :text, default: "", null: false
    add_column :posts, :author_id, :integer
  end
end
