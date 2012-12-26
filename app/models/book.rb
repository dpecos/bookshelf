# == Schema Information
#
# Table name: books
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  author      :string(255)
#  year        :integer
#  pages       :integer
#  editorial   :string(255)
#  isbn        :string(255)
#  url         :string(255)
#  abstract    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :integer
#

class Book < ActiveRecord::Base
  belongs_to :category
  has_many :readings, :dependent => :destroy

  attr_accessible :id, :category_id, :abstract, :author, :editorial, :isbn, :pages, :title, :url, :year, :category
    
  validates :title, :presence => true
  validates :author, :presence => true
  validates :category, :presence => true
end
