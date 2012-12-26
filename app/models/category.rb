class Category < ActiveRecord::Base
  has_many :books

  attr_accessible :name
  
  validates :name, :presence => true
end
