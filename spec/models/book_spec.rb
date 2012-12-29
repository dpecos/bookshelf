# == Schema Information
#
# Table name: books
#
#  id           :integer          not null, primary key
#  title        :string(255)
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
#  cover        :binary(16777216)
#  reading_date :string(255)
#

require 'spec_helper'

describe Book do

  before { 
    category = Category.new
    @book = Book.new(:title => "Dummy title", :author => "Dummy author", :category => category, :reading_date => "2012/12") 
  }
  subject { @book }

  describe "invalid" do

    it "fails validation because lack of title" do 
      @book.title = nil 
      should_not be_valid
    end

    it "fails validation because lack of author" do 
      @book.author = nil
      should_not be_valid
    end

    it "fails validations because is not assigned to a category" do
      @book.category = nil
      should_not be_valid
    end

    it "fails validations because lack of reading date" do
      @book.reading_date = nil
      should_not be_valid
    end

  end

  describe "valid" do 
    it "validates" do
      should be_valid
    end

    it "belongs to one category" do
      should belong_to(:category)
    end
  end

end
