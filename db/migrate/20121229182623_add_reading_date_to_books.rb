class AddReadingDateToBooks < ActiveRecord::Migration
  def change
    add_column :books, :reading_date, :string
  end
end
