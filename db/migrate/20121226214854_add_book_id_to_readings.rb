class AddBookIdToReadings < ActiveRecord::Migration
  def change
    add_column :readings, :book_id, :integer
  end
end
