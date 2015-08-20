# == Schema Information
#
# Table name: books
#
#  id           :integer          not null, primary key
#  title        :string(255)
#  title_vo        :string(255)
#  author       :string(255)
#  year         :integer
#  pages        :integer
#  editorial    :string(255)
#  isbn         :string(255)
#  url          :string(255)
#  abstract     :text
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  category_id  :integer
#  collection_id  :integer
#  cover        :binary(16777216)
#  reading_date :string(255)
#

class Book < ActiveRecord::Base
  belongs_to :category
  belongs_to :collection

  attr_accessible :id, :category_id, :collection_id, :abstract, :author, :editorial, :isbn, :pages, :title, :title_vo, :url, :year, :category, :reading_date, :cover
    
  validates :title, :presence => true
  validates :author, :presence => true
  validates :category, :presence => true
  validates :reading_date, :presence => true

end
