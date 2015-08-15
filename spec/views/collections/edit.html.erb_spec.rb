require 'spec_helper'

describe "collections/edit" do
  before(:each) do
    @collection = assign(:collection, stub_model(Collection,
      :name => "MyString",
      :description => "MyText",
      :link => "MyString"
    ))
  end

  it "renders the edit collection form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => collections_path(@collection), :method => "post" do
      assert_select "input#collection_name", :name => "collection[name]"
      assert_select "textarea#collection_description", :name => "collection[description]"
      assert_select "input#collection_link", :name => "collection[link]"
    end
  end
end
