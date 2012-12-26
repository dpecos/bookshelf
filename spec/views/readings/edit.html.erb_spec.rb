require 'spec_helper'

describe "readings/edit" do
  before(:each) do
    @reading = assign(:reading, stub_model(Reading,
      :notes => "MyText",
      :year => 1,
      :month => 1
    ))
  end

  it "renders the edit reading form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => readings_path(@reading), :method => "post" do
      assert_select "textarea#reading_notes", :name => "reading[notes]"
      assert_select "input#reading_year", :name => "reading[year]"
      assert_select "input#reading_month", :name => "reading[month]"
    end
  end
end
