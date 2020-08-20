import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

interface IProps {}

interface IState {
  books: any[];
  book: any;
}

export class BooksList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      books: [],
      book: null,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    fetch('http://localhost:8080/api/books')
      .then((response) => response.json())
      .then((json) => this.setState({ books: json }));
  }

  showBookDetails(book: any) {
    fetch(`http://localhost:8080/api/books/${book.id}`)
      .then((response) => response.json())
      .then((json) => this.setState({ book: json }));
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Category</th>
            <th>Collection</th>
          </tr>
        </thead>
        <tbody>
          {this.state.books.length === 0 ? (
            <tr>
              <td colSpan={6}>Loading books...</td>
            </tr>
          ) : (
            this.state.books.map((book) => (
              <tr key={book.id} onClick={() => this.showBookDetails(book)}>
                <td>
                  <img
                    alt={book.title}
                    src={`http://localhost:8080/api/books/${book.id}/cover`}
                    width="50px"
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.category.name}</td>
                <td>{book.collection?.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}
