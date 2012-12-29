require 'spec_helper'

describe "Books" do
  describe "GET /books/1/cover" do
    it "return a 200 OK code" do
      book = mock_model Book
      Book.stub!(:find).and_return(book)

      get cover_book_path(-1)
      response.status.should be(200)
    end
  end
end
