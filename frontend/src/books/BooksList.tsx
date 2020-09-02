import { History } from 'history';
import React, { Component } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './books.css';
import { getLanguage } from './languages';
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
  Card,
  Button,
} from 'react-bootstrap';

interface IProps {
  history: History;
  type: string | undefined;
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
    const url =
      this.props.type === 'detailed'
        ? `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/detailed`
        : `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books`;

    fetch(url)
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
          <Navbar.Collapse className="justify-content-start">
            <Nav variant="pills">
              <Nav.Link as={NavLink} to="/books/list" exact={true}>
                Normal list
              </Nav.Link>
              <Nav.Link as={NavLink} to="/books/list/detailed" exact={true}>
                Detailed list
              </Nav.Link>
              <Nav.Link as={NavLink} to="/books/list/shelf" exact={true}>
                Shelf
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Filter books"
                className="mr-sm-2"
                onChange={(event) => this.filterBooks(event)}
              />
            </Form>
            <Nav>
              <Button as={Link} to="/books/new" variant="success">
                New book
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.state.message && (
          <Container>
            <Row>
              <Col lg="12">
                <Alert key={'error'} variant={'danger'}>
                  <Alert.Heading>Oh no! There was an error!</Alert.Heading>
                  <p>{this.state.message}</p>
                </Alert>
              </Col>
            </Row>
          </Container>
        )}

        {this.props.type === 'shelf' &&
          (this.state.fullList.length === 0 && !this.state.message ? (
            <>Loading books...</>
          ) : (
            <Container fluid>
              <Row>
                {this.state.books.map((book) => (
                  <Col key={book.id}>
                    <Card
                      style={{ width: '18rem' }}
                      onClick={() => this.showBookDetails(book)}
                    >
                      <Card.Img
                        variant="top"
                        src={`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/${book.id}/cover`}
                        onError={(event: any) =>
                          (event.target.src =
                            '/img/book-cover-not-available.jpg')
                        }
                      />

                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        {book.collection && (
                          <Card.Subtitle className="mb-2 text-muted">
                            {book.collection.name}
                          </Card.Subtitle>
                        )}
                        <Card.Text>
                          {book.author} ({book.year})
                          <br />
                          {book.category?.name}
                        </Card.Text>
                        {/*<Button variant="primary">Go somewhere</Button> */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          ))}

        {this.props.type === 'concise' && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Language</th>
                <th>Author</th>
                <th>Year</th>
                <th>Category</th>
                <th>Collection</th>
              </tr>
            </thead>
            <tbody>
              {this.state.fullList.length === 0 && !this.state.message ? (
                <tr>
                  <td colSpan={7}>Loading books...</td>
                </tr>
              ) : (
                this.state.books.map((book) => (
                  <tr key={book.id} onClick={() => this.showBookDetails(book)}>
                    <td>
                      <img
                        alt={book.title}
                        src={`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/${book.id}/cover`}
                        width="50px"
                        onError={(event: any) =>
                          (event.target.src =
                            '/img/book-cover-not-available.jpg')
                        }
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{getLanguage(book.language)}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>{book.category.name}</td>
                    <td>{book.collection?.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        {this.props.type === 'detailed' && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Language</th>
                <th>Author</th>
                <th>Year</th>
                <th>Category</th>
                <th>Collection</th>
                <th>Pages</th>
                <th>Editorial</th>
                <th>ISBN</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {this.state.fullList.length === 0 && !this.state.message ? (
                <tr>
                  <td colSpan={11}>Loading books...</td>
                </tr>
              ) : (
                this.state.books.map((book) => (
                  <tr key={book.id} onClick={() => this.showBookDetails(book)}>
                    <td>
                      <img
                        alt={book.title}
                        src={`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/${book.id}/cover`}
                        width="50px"
                        onError={(event: any) =>
                          (event.target.src =
                            '/img/book-cover-not-available.jpg')
                        }
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{getLanguage(book.language)}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>{book.category.name}</td>
                    <td>{book.collection?.name}</td>
                    <td>{book.pages}</td>
                    <td>{book.editorial}</td>
                    <td>{book.isbn}</td>
                    <td>{book.url}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </>
    );
  }
}

export function BooksListConcise() {
  const history = useHistory();
  return <BooksList history={history} type={'concise'} />;
}

export function BooksListShelf() {
  const history = useHistory();
  return <BooksList history={history} type={'shelf'} />;
}

export function BooksListDetailed() {
  const history = useHistory();
  return <BooksList history={history} type={'detailed'} />;
}
