require 'spec_helper'

describe "books/show" do
  before(:each) do
    category = stub_model(Category, 
      :id => -1,
      :name => "Dummy Category"
    )
    @book = assign(:book, stub_model(Book,
      :category => category,
      :title => "Title",
      :author => "Author",
      :year => 1,
      :reading_date => "2012/12",
      :pages => 2,
      :editorial => "Editorial",
      :isbn => "Isbn",
      :url => "Url",
      :abstract => "MyText"
    ))

    Category.stub!(:all).and_return([category])
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Dummy Category/)
    rendered.should match(/Title/)
    rendered.should match(/Author/)
    rendered.should match(/1/)
    rendered.should match(/2012\/12/)
    rendered.should match(/2/)
    rendered.should match(/Editorial/)
    rendered.should match(/Isbn/)
    rendered.should match(/Url/)
    rendered.should match(/MyText/)
  end
end
