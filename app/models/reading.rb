# == Schema Information
#
# Table name: readings
#
#  id         :integer          not null, primary key
#  notes      :text
#  year       :integer
#  month      :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  book_id    :integer
#

class Reading < ActiveRecord::Base
  belongs_to :book

  attr_accessible :id, :book_id, :month, :notes, :year

  validates :year, :presence => true
  validates :month, :presence => true
end
