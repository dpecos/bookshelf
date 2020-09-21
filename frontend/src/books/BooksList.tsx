import { History, Location } from 'history';
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Jumbotron,
  Nav,
  Navbar,
  Row,
  Table,
  Toast,
} from 'react-bootstrap';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import './books.css';
import { getLanguage } from './languages';

interface IProps {
  history: History;
  location: Location;
  type: string | undefined;
}

interface IState {
  books: any[];
  fullList: any[];
  message: string | null;
  filterPicture: string | null;
  filterHeader: string | null;
  filterBody: string | null;
  filterLink: string | null;
}
class BooksList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      books: [],
      fullList: [],
      message: null,
      filterPicture: null,
      filterHeader: null,
      filterBody: null,
      filterLink: null,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchBooks();
    }
  }

  async fetchAuthor(id: string | null): Promise<any> {
    if (!id) {
      return null;
    }

    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors/${id}`
    );
    const json = await response.json();
    return json;
  }

  async fetchCategory(id: string | null): Promise<any> {
    if (!id) {
      return null;
    }

    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/${id}`
    );
    const json = await response.json();
    return json;
  }

  async fetchCollection(id: string | null): Promise<any> {
    if (!id) {
      return null;
    }

    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/collections/${id}`
    );
    const json = await response.json();
    return json;
  }

  async parseFilterParameters(): Promise<string> {
    const urlParams = new URLSearchParams(window.location.search);
    const parameters = Array.from(urlParams.keys());

    let url: string = '';

    if (parameters.length > 0) {
      const paramsList = parameters.map(
        (param) => `${param}=${urlParams.get(param)}`
      );
      url = `?${paramsList.join('&')}`;

      const filter = parameters.pop() || '';
      const filterValue = urlParams.get(filter);

      if (filter === 'author') {
        const author = await this.fetchAuthor(filterValue);
        let filterHeader = author.name;
        if (author.nationality || author.year) {
          filterHeader = `${filterHeader} (${[
            author.nationality,
            author.year,
          ].join(', ')})`;
        }
        this.setState({
          filterPicture: `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors/${author.id}/photo`,
          filterHeader,
          filterBody: author.biography,
          filterLink: author.link,
        });
      } else if (filter === 'category') {
        const category = await this.fetchCategory(filterValue);
        this.setState({
          filterPicture: null,
          filterHeader: category.name,
          filterBody: null,
          filterLink: null,
        });
      } else if (filter === 'collection') {
        const collection = await this.fetchCollection(filterValue);
        this.setState({
          filterPicture: null,
          filterHeader: collection.name,
          filterBody: collection.description,
          filterLink: collection.link,
        });
      }
    } else {
      this.setState({
        filterPicture: null,
        filterHeader: null,
        filterBody: null,
        filterLink: null,
      });
    }

    return url;
  }

  async fetchBooks() {
    let url =
      this.props.type === 'detailed'
        ? `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/detailed`
        : `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books`;

    url = `${url}${await this.parseFilterParameters()}`;

    const response = await fetch(url);
    const json = await response.json();
    if (response.status === 200) {
      this.setState({ fullList: json, books: json });
    } else {
      this.setState({
        message: `${json.type.toUpperCase()}: ${json.message}`,
      });
    }
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
          (book.titleOV && book.titleOV.toLowerCase().indexOf(filter) !== -1) ||
          book.author.name.toLowerCase().indexOf(filter) !== -1
      ),
    });
  }

  dismissErrorMessage() {
    this.setState({ message: null });
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
          <Toast
            delay={10000}
            autohide
            onClose={() => this.dismissErrorMessage()}
          >
            <Toast.Header>
              <strong className="mr-auto">Server message</strong>
            </Toast.Header>
            <Toast.Body>
              <p>There was an error processing last request:</p>
              <Alert variant="danger">{this.state.message}</Alert>
            </Toast.Body>
          </Toast>
        )}

        {this.state.filterHeader && (
          <Jumbotron id="filterInfo">
            {this.state.filterPicture && (
              <img
                src={this.state.filterPicture}
                onError={(event: any) =>
                  (event.target.src = '/img/author-photo-not-available.png')
                }
              ></img>
            )}
            <div id="filterContent">
              <h1>{this.state.filterHeader}</h1>
              {this.state.filterLink && (
                <a
                  href={this.state.filterLink}
                  onClick={(evt) => evt.stopPropagation()}
                  target="_new"
                >
                  {this.state.filterLink}
                </a>
              )}
              {this.state.filterBody
                ?.split('\n')
                .map((line: string, idx: number) => (
                  <p key={idx}>{line}</p>
                ))}
            </div>
          </Jumbotron>
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
                            <Link
                              to={`?collection=${book.collection?.id}`}
                              onClick={(evt) => evt.stopPropagation()}
                            >
                              {book.collection?.name}
                            </Link>
                            {book.collectionNumber
                              ? ` (${book.collectionNumber})`
                              : ''}
                          </Card.Subtitle>
                        )}
                        <Card.Text>
                          <Link
                            to={`${window.location.pathname}?author=${book.author.id}`}
                            onClick={(evt) => evt.stopPropagation()}
                          >
                            {book.author.name}
                          </Link>{' '}
                          ({book.year})
                          <br />
                          <Link
                            to={`?category=${book.category.id}`}
                            onClick={(evt) => evt.stopPropagation()}
                          >
                            {book.category?.name}
                          </Link>
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
                    <td>
                      <Link
                        to={`${window.location.pathname}?author=${book.author.id}`}
                        onClick={(evt) => evt.stopPropagation()}
                      >
                        {book.author.name}
                      </Link>
                    </td>
                    <td>{book.year}</td>
                    <td>
                      <Link
                        to={`?category=${book.category.id}`}
                        onClick={(evt) => evt.stopPropagation()}
                      >
                        {book.category?.name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`?collection=${book.collection?.id}`}
                        onClick={(evt) => evt.stopPropagation()}
                      >
                        {book.collection?.name}
                      </Link>
                      {book.collectionNumber
                        ? ` (${book.collectionNumber})`
                        : ''}
                    </td>
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
                <th>Link</th>
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
                    <td>
                      <Link
                        to={`${window.location.pathname}?author=${book.author.id}`}
                        onClick={(evt) => evt.stopPropagation()}
                      >
                        {book.author.name}
                      </Link>
                    </td>
                    <td>{book.year}</td>
                    <td>
                      <Link
                        to={`?category=${book.category.id}`}
                        onClick={(evt) => evt.stopPropagation()}
                      >
                        {book.category?.name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`?collection=${book.collection?.id}`}
                        onClick={(evt) => evt.stopPropagation()}
                      >
                        {book.collection?.name}
                      </Link>
                      {book.collectionNumber
                        ? ` (${book.collectionNumber})`
                        : ''}
                    </td>
                    <td>{book.pages}</td>
                    <td>{book.editorial}</td>
                    <td>
                      <a
                        href={`https://en.wikipedia.org/wiki/Special:BookSources?isbn=${book.isbn}`}
                        onClick={(evt) => evt.stopPropagation()}
                        target="_new"
                      >
                        {book.isbn}
                      </a>
                    </td>
                    <td>{book.link}</td>
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
  const location = useLocation();
  return <BooksList history={history} location={location} type={'concise'} />;
}

export function BooksListShelf() {
  const history = useHistory();
  const location = useLocation();
  return <BooksList history={history} location={location} type={'shelf'} />;
}

export function BooksListDetailed() {
  const history = useHistory();
  const location = useLocation();
  return <BooksList history={history} location={location} type={'detailed'} />;
}
