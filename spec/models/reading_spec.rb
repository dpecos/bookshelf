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

require 'spec_helper'

describe Reading do
  before {
    @reading = Reading.new(:year => 2012, :month => 12, :notes => "blah blah blah")
  }

  subject { @reading }

  describe "invalid" do
    it "fails validations because lack of year" do
      @reading.year = nil
      should_not be_valid
    end
      
    it "fails validations because lack of month" do
      @reading.month = nil
      should_not be_valid
    end
  end

  describe "valid" do
    it "validates" do
      should be_valid
    end

    it "belongs to a book" do
      should belong_to(:book)
    end
  end
end
