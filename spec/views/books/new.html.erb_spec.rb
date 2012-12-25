require 'spec_helper'

describe "books/new" do
  before(:each) do
    assign(:book, stub_model(Book,
      :title => "MyString",
      :author => "MyString",
      :year => 1,
      :pages => 1,
      :editorial => "MyString",
      :isbn => "MyString",
      :url => "MyString",
      :abstract => "MyText"
    ).as_new_record)
  end

  it "renders new book form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => books_path, :method => "post" do
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
