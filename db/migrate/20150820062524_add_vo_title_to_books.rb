class AddVoTitleToBooks < ActiveRecord::Migration
  def change
    add_column :books, :title_vo, :string
  end
end
