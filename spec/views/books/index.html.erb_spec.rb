require 'spec_helper'

describe "books/index" do
  before(:each) do
    assign(:books, [
      stub_model(Book,
        :title => "Title",
        :author => "Author",
        :year => 1,
        :pages => 2,
        :editorial => "Editorial",
        :isbn => "Isbn",
        :url => "Url",
        :abstract => "MyText"
      ),
      stub_model(Book,
        :title => "Title",
        :author => "Author",
        :year => 1,
        :pages => 2,
        :editorial => "Editorial",
        :isbn => "Isbn",
        :url => "Url",
        :abstract => "MyText"
      )
    ])
  end

  it "renders a list of books" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "Author".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "Editorial".to_s, :count => 2
    assert_select "tr>td", :text => "Isbn".to_s, :count => 2
    assert_select "tr>td", :text => "Url".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
