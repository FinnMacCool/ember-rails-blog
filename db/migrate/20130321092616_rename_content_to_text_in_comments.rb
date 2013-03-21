class RenameContentToTextInComments < ActiveRecord::Migration
  def change
    rename_column :comments, :content, :text
  end
end
