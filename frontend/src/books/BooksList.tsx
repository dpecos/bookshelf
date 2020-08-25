import { History } from 'history';
import React, { Component } from 'react';
import {
  Alert,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

interface IProps {
  history: History;
}

interface IState {
  books: any[];
  fullList: any[];
  message: string | null;
}
class BooksList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      books: [],
      fullList: [],
      message: null,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    fetch('http://localhost:8080/api/books')
      .then((response) => response.json())
      .then((json) => this.setState({ fullList: json, books: json }))
      .catch((err) => this.setState({ message: 'Error retrieving books' }));
  }

  showBookDetails(book: any) {
    this.props.history.push(`/books/${book.id}`);
  }

  filterBooks(event: any) {
    const filter = event.target.value.toLowerCase();
    this.setState({
      books: this.state.fullList.filter(
        (book) =>
          book.title.toLowerCase().indexOf(filter) !== -1 ||
          (book.titleOV && book.titleOV.toLowerCase().indexOf(filter) !== -1)
      ),
    });
  }

  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand>Books</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/books/new">
                New book
              </Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Filter books"
                className="mr-sm-2"
                onChange={(event) => this.filterBooks(event)}
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>

        {this.state.message && (
          <Container>
            <Row>
              <Col lg="12">
                <Alert key={'error'} variant={'danger'}>
                  {this.state.message}
                </Alert>
              </Col>
            </Row>
          </Container>
        )}

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
            {this.state.fullList.length === 0 ? (
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
      </>
    );
  }
}

export default () => {
  const history = useHistory();
  return <BooksList history={history} />;
};
