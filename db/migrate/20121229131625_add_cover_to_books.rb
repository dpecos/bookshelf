class AddCoverToBooks < ActiveRecord::Migration
  def change
    add_column :books, :cover, :binary, :limit => 16.megabyte
  end
end
