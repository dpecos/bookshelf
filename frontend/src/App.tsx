import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table
  } from 'react-bootstrap';
import './App.css';

interface IProps {}

interface IState {
  books: any[];
  book: any;
}

class App extends Component<IProps, IState> {
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

  hideBookDetails() {
    this.setState({ book: null });
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
                      <tr
                        key={book.id}
                        onClick={() => this.showBookDetails(book)}
                      >
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

              <Modal
                show={this.state.book !== null}
                animation={false}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => {
                  this.hideBookDetails();
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    {this.state.book?.title}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      <Col lg="6">
                        <Table striped bordered hover>
                          <tbody>
                            <tr>
                              <td>Title</td>
                              <td>{this.state.book?.title}</td>
                            </tr>
                            <tr>
                              <td>Language</td>
                              <td>{this.state.book?.language}</td>
                            </tr>
                            <tr>
                              <td>Title OV</td>
                              <td>{this.state.book?.titleOV}</td>
                            </tr>
                            <tr>
                              <td>Languag OV</td>
                              <td>{this.state.book?.languageOV}</td>
                            </tr>
                            <tr>
                              <td>Author</td>
                              <td>{this.state.book?.author}</td>
                            </tr>
                            <tr>
                              <td>Year</td>
                              <td>{this.state.book?.year}</td>
                            </tr>
                            <tr>
                              <td>Category</td>
                              <td>{this.state.book?.category.name}</td>
                            </tr>
                            <tr>
                              <td>Collection</td>
                              <td>{this.state.book?.collection?.name}</td>
                            </tr>
                            <tr>
                              <td>Pages</td>
                              <td>{this.state.book?.pages}</td>
                            </tr>
                            <tr>
                              <td>Editorial</td>
                              <td>{this.state.book?.editorial}</td>
                            </tr>
                            <tr>
                              <td>ISBN</td>
                              <td>{this.state.book?.isbn}</td>
                            </tr>
                            <tr>
                              <td>URL</td>
                              <td>{this.state.book?.url}</td>
                            </tr>
                            <tr>
                              <td>Reading Dates</td>
                              <td>
                                {this.state.book?.readingDates.join(' -- ')}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col lg="6">
                        <img
                          alt={this.state.book?.title}
                          src={`http://localhost:8080/api/books/${this.state.book?.id}/cover`}
                          width="350px"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>{this.state.book?.abstract}</Col>
                    </Row>
                  </Container>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      this.hideBookDetails();
                    }}
                  >
                    Close
                  </Button>
                  {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button> */}
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
