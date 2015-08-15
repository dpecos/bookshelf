class Collection < ActiveRecord::Base
  has_many :books

  attr_accessible :description, :link, :name
end
