# == Schema Information
#
# Table name: categories
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'

describe Category do

  before { @category = Category.new(:name => "Dummy category") }
  subject { @category }

  it "is invalid when lacks name" do
    @category.name = nil
    should_not be_valid
  end

  it "has many books" do
    should have_many(:books)
  end

end
