class CreateReadings < ActiveRecord::Migration
  def change
    create_table :readings do |t|
      t.text :notes
      t.integer :year
      t.integer :month

      t.timestamps
    end
  end
end
