require 'spec_helper'

describe "books/edit" do
  before(:each) do
    @book = assign(:book, stub_model(Book,
      :title => "MyString",
      :author => "MyString",
      :year => 1,
      :pages => 1,
      :editorial => "MyString",
      :isbn => "MyString",
      :url => "MyString",
      :abstract => "MyText"
    ))
  end

  it "renders the edit book form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => books_path(@book), :method => "post" do
      assert_select "input#book_title", :name => "book[title]"
      assert_select "input#book_author", :name => "book[author]"
      assert_select "input#book_year", :name => "book[year]"
      assert_select "input#book_pages", :name => "book[pages]"
      assert_select "input#book_editorial", :name => "book[editorial]"
      assert_select "input#book_isbn", :name => "book[isbn]"
      assert_select "input#book_url", :name => "book[url]"
      assert_select "textarea#book_abstract", :name => "book[abstract]"
    end
  end
end
