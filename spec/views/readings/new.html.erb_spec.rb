require 'spec_helper'

describe "readings/new" do
  before(:each) do
    assign(:reading, stub_model(Reading,
      :notes => "MyText",
      :year => 1,
      :month => 1
    ).as_new_record)
  end

  it "renders new reading form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => readings_path, :method => "post" do
      assert_select "textarea#reading_notes", :name => "reading[notes]"
      assert_select "input#reading_year", :name => "reading[year]"
      assert_select "input#reading_month", :name => "reading[month]"
    end
  end
end
