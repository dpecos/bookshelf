# == Schema Information
#
# Table name: books
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  author     :string(255)
#  year       :integer
#  pages      :integer
#  editorial  :string(255)
#  isbn       :string(255)
#  url        :string(255)
#  abstract   :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Book < ActiveRecord::Base
  attr_accessible :abstract, :author, :editorial, :isbn, :pages, :title, :url, :year

  validates :title, :presence => true
  validates :author, :presence => true
end
