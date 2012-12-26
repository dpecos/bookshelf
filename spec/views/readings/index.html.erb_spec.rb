require 'spec_helper'

describe "readings/index" do
  before(:each) do
    assign(:readings, [
      stub_model(Reading,
        :notes => "MyText",
        :year => 1,
        :month => 2
      ),
      stub_model(Reading,
        :notes => "MyText",
        :year => 1,
        :month => 2
      )
    ])
  end

  it "renders a list of readings" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
