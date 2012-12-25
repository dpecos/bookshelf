require 'spec_helper'

describe Category do

  before { @category = Category.new(:name => "Dummy category") }
  subject { @category }

  it "is invalid when lacks name" do
    @category.name = nil
    should_not be_valid
  end

end
