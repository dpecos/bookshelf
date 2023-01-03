import { History } from 'history';
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Navbar,
  Row,
  Table,
  Toast,
} from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Rating } from '../common/rating';
import './books.css';
import { getLanguage } from './languages';

interface IProps {
  history: History;
  bookId: string;
}

interface IState {
  book: any;
  message: string | null;
}

export class BookDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      book: null,
      message: null,
    };
  }

  componentDidMount() {
    if (this.props.bookId) {
      this.fetchBookDetails(this.props.bookId);
    }
  }

  fetchBookDetails(bookId: string) {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/${bookId}`
    )
      .then((response) => response.json())
      .then((json) => this.setState({ book: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving book details' })
      );
  }

  hideBookDetails() {
    this.props.history.goBack();
  }

  editBook() {
    this.props.history.push(`/books/${this.props.bookId}/edit`);
  }

  dismissErrorMessage() {
    this.setState({ message: null });
  }

  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand>{this.state.book?.title}</Navbar.Brand>
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

        <Container id="bookDetails">
          <Row>
            <Col lg="6">
              {this.state.book && (
                <Card>
                  <Card.Img
                    variant="top"
                    id="bookCover"
                    src={`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/${this.state.book?.id}/cover`}
                    onError={(event: any) =>
                      (event.target.src = '/img/book-cover-not-available.jpg')
                    }
                  />
                  {this.state.book?.abstract && (
                    <Card.Body>
                      <Card.Subtitle className="mb-2 text-muted">
                        Abstract
                      </Card.Subtitle>
                      {this.state.book?.abstract
                        .split('\n')
                        .map((line: string, idx: number) => (
                          <Card.Text key={idx}>{line}</Card.Text>
                        ))}
                    </Card.Body>
                  )}
                </Card>
              )}
            </Col>
            <Col lg="6">
              <Table striped bordered hover>
                <tbody>
                  {[
                    { id: 'title', label: 'Title' },
                    { id: 'titleOV', label: 'Title OV' },
                    {
                      id: 'language',
                      label: 'Language',
                      value: getLanguage(this.state.book?.language),
                    },
                    {
                      id: 'languageOV',
                      label: 'Language OV',
                      value: getLanguage(this.state.book?.languageOV),
                    },
                    {
                      id: 'authors',
                      label: 'Authors',
                      values: this.state.book?.authors.map((author: any) => author.name),
                      links: this.state.book?.authors.map((author: any) => `/books/list?author=${author.id}`),
                    },
                    { id: 'year', label: 'Year' },
                    {
                      id: 'category',
                      label: 'Category',
                      value: this.state.book?.category.name,
                      link: `/books/list?category=${this.state.book?.category.id}`,
                    },
                    {
                      id: 'collection',
                      label: 'Collection',
                      value: this.state.book?.collection?.name,
                      link: `/books/list?collection=${this.state.book?.collection?.id}`,
                    },
                    { id: 'collectionNumber', label: 'Collection #' },
                    { id: 'pages', label: 'Pages' },
                    { id: 'editorial', label: 'Editorial' },
                    {
                      id: 'isbn',
                      label: 'ISBN',
                      link: `https://en.wikipedia.org/wiki/Special:BookSources?isbn=${this.state.book?.isbn}`,
                      target: '_new',
                    },
                    { id: 'link', label: 'Link' },
                    {
                      id: 'readingDates',
                      label: 'Reading Dates',
                      value: this.state.book?.readingDates.join(' -- '),
                    },
                    {
                      id: 'rating',
                      label: 'Rating',
                      type: 'stars',
                      value: this.state.book?.rating,
                    },
                  ].map((field) => (
                    <tr key={field.id}>
                      <td>{field.label}</td>
                      <td>
                        {field.links && (field.links.map((link: any, i: number) => (
                          <Link
                            className="author_link"
                            to={link}
                            onClick={(evt) => evt.stopPropagation()}
                          >
                            {field.values[i]}
                          </Link>
                        )))}
                        {field.link && !field.target && (
                          <Link
                            to={field.link}
                            onClick={(evt) => evt.stopPropagation()}
                          >
                            {field.value || this.state.book?.[field.id] || ''}
                          </Link>
                        )}
                        {field.link && field.target && (
                          <a
                            href={field.link}
                            onClick={(evt) => evt.stopPropagation()}
                            target={field.target}
                          >
                            {field.value || this.state.book?.[field.id] || ''}
                          </a>
                        )}
                        {field.type === 'stars' && (
                          <Rating rating={field.value} />
                        )}
                        {!field.link && !field.links &&
                          !field.type &&
                          (field.value || this.state.book?.[field.id] || '')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        <Navbar bg="light" variant="light" fixed="bottom">
          <Navbar.Collapse className="justify-content-end">
            <Button
              variant="secondary"
              onClick={() => {
                this.hideBookDetails();
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => this.editBook()}>
              Edit
            </Button>
          </Navbar.Collapse>
        </Navbar>

      </>
    );
  }
}

export default () => {
  const { bookId } = useParams();
  const history = useHistory();
  return <BookDetails bookId={bookId} history={history} />;
};
