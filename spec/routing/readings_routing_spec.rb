require "spec_helper"

describe ReadingsController do
  describe "routing" do

    it "routes to #index" do
      get("/readings").should route_to("readings#index")
    end

    it "routes to #new" do
      get("/readings/new").should route_to("readings#new")
    end

    it "routes to #show" do
      get("/readings/1").should route_to("readings#show", :id => "1")
    end

    it "routes to #edit" do
      get("/readings/1/edit").should route_to("readings#edit", :id => "1")
    end

    it "routes to #create" do
      post("/readings").should route_to("readings#create")
    end

    it "routes to #update" do
      put("/readings/1").should route_to("readings#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/readings/1").should route_to("readings#destroy", :id => "1")
    end

  end
end
