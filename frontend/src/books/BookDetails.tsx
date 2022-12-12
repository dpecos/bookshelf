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
import StarRatingComponent from 'react-star-rating-component';
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
        {/* <Modal
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
          <Modal.Body> */}

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
                      id: 'author',
                      label: 'Author',
                      value: this.state.book?.author.name,
                      link: `/books/list?author=${this.state.book?.author.id}`,
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
                          <StarRatingComponent
                            name="rating"
                            value={field.value || 0}
                            editing={false}
                          />
                        )}
                        {field.type === 'stars' &&
                          ((field.value === 1 && 'Bad') ||
                            (field.value === 2 && 'Ok') ||
                            (field.value === 3 && 'Good') ||
                            (field.value === 4 && 'Great') ||
                            (field.value === 5 && 'Wow'))}
                        {!field.link &&
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

        {/* </Modal.Body>
          <Modal.Footer>
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
          </Modal.Footer>
        </Modal> */}
      </>
    );
  }
}

export default () => {
  const { bookId } = useParams();
  const history = useHistory();
  return <BookDetails bookId={bookId} history={history} />;
};
