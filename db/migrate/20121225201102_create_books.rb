class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :year
      t.integer :pages
      t.string :editorial
      t.string :isbn
      t.string :url
      t.text :abstract

      t.timestamps
    end
  end
end
