import React, { Component } from 'react';
import {
  Col,
  Container,
  Row,
  Table
  } from 'react-bootstrap';
import './App.css';

interface IProps {}

interface IState {
  books: any[];
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      books: [],
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

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
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
                      <td colSpan={5}>Loading books...</td>
                    </tr>
                  ) : (
                    this.state.books.map((book) => (
                      <tr key={book.id}>
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
