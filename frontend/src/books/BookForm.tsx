import bsCustomFileInput from 'bs-custom-file-input';
import { History } from 'history';
import React, { Component } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './books.css';
import { languages } from './languages';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Navbar,
  Row,
  Modal,
} from 'react-bootstrap';

interface IProps {
  history: History;
  bookId: string;
}

interface IState {
  book: any;
  isNew: boolean;
  pageTitle: string;
  collections: any;
  categories: any;
  message: string | null;
  showConfirmDeletion: boolean;
}

class BookForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      book: null,
      isNew: false,
      pageTitle: '',
      collections: [],
      categories: [],
      message: null,
      showConfirmDeletion: false,
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();

    this.fetchCollections();
    this.fetchCategories();

    if (this.props.bookId) {
      this.fetchBookDetails(this.props.bookId);
      this.setState({ isNew: false, pageTitle: 'Edit book' });
    } else {
      this.setState({ isNew: true, book: {}, pageTitle: 'New book' });
    }
  }

  fetchCollections() {
    fetch(`http://localhost:8080/api/collections`)
      .then((response) => response.json())
      .then((json) => this.setState({ collections: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving collections' })
      );
  }

  fetchCategories() {
    fetch(`http://localhost:8080/api/categories`)
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving categories' })
      );
  }

  fetchBookDetails(bookId: string) {
    fetch(`http://localhost:8080/api/books/${bookId}`)
      .then((response) => response.json())
      .then((json) => this.setState({ book: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving book details' })
      );
  }

  closeBookForm() {
    this.props.history.goBack();
  }

  async createBook() {
    const response = await fetch(`http://localhost:8080/api/books`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.book),
    });

    const json = await response.json();
    if (response.ok) {
      this.props.history.push(`/books/${json.id}`);
    } else {
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  async deleteBook() {
    await fetch(`http://localhost:8080/api/books/${this.props.bookId}`, {
      method: 'delete',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.props.history.push('/');
  }

  showConfirmationDialog() {
    this.setState({ showConfirmDeletion: true });
  }

  closeConfirmationDialog() {
    this.setState({ showConfirmDeletion: false });
  }

  async editBook() {
    const response = await fetch(
      `http://localhost:8080/api/books/${this.props.bookId}`,
      {
        method: 'put',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.book),
      }
    );

    const json = await response.json();
    if (response.ok) {
      this.closeBookForm();
    } else {
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  convertImageToBase64(input: any): Promise<string> {
    return new Promise((resolve) => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  async handleChangeEvent(event: any) {
    if (event) {
      const book = this.state.book;
      const field = event.target.id;
      const value = event.target.value.trim() || null;

      if (field === 'category') {
        const category = this.state.categories.find(
          (category: any) => category.id === value
        );
        book.category = category;
      } else if (field === 'collection') {
        const collection = this.state.collections.find(
          (collection: any) => collection.id === value
        );
        book.collection = collection;
      } else if (field === 'readingDates') {
        book.readingDates = value.split(',');
      } else if (field === 'cover') {
        book.cover = await this.convertImageToBase64(event.currentTarget);
      } else {
        book[field] = value;
      }
      this.setState({ book });
    }
  }

  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand>{this.state.pageTitle}</Navbar.Brand>
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
        <Container>
          <Form id="bookForm">
            <Row>
              <Col lg="6">
                {[
                  { id: 'title', label: 'Title' },
                  { id: 'titleOV', label: 'Title OV' },
                  {
                    id: 'language',
                    label: 'Language',
                    options: languages,
                  },
                  {
                    id: 'languageOV',
                    label: 'Language OV',
                    options: languages,
                  },
                  { id: 'author', label: 'Author' },
                  { id: 'year', label: 'Year' },
                  {
                    id: 'category',
                    label: 'Category',
                    options: this.state.categories.map((category: any) => {
                      return { value: category.id, label: category.name };
                    }),
                  },

                  {
                    id: 'collection',
                    label: 'Collection',
                    options: this.state.collections.map((collection: any) => {
                      return { value: collection.id, label: collection.name };
                    }),
                  },
                  { id: 'pages', label: 'Pages' },
                  { id: 'editorial', label: 'Editorial' },
                  { id: 'isbn', label: 'ISBN' },
                  { id: 'url', label: 'URL' },
                  {
                    id: 'readingDates',
                    label: 'Reading Dates',
                    value: this.state.book?.readingDates?.join(','),
                  },
                ].map((field) => {
                  if (field.options) {
                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control
                          as="select"
                          placeholder={field.label}
                          value={
                            field.value ||
                            this.state.book?.[field.id]?.id ||
                            this.state.book?.[field.id] ||
                            ''
                          }
                          onChange={(event) => this.handleChangeEvent(event)}
                        >
                          <option></option>
                          {field.options.map((option: any) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else {
                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={field.label}
                          value={
                            field.value || this.state.book?.[field.id] || ''
                          }
                          onChange={(event) => this.handleChangeEvent(event)}
                        />
                      </Form.Group>
                    );
                  }
                })}
              </Col>
              <Col lg="6">
                {this.state.book?.cover && (
                  <img
                    alt={this.state.book?.title}
                    src={this.state.book.cover}
                    width="350px"
                  />
                )}
                <Form.File
                  id="cover"
                  label="Book cover"
                  custom
                  onChange={(event: any) => this.handleChangeEvent(event)}
                />
                <Form.Group controlId="abstract">
                  <Form.Label>Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Abstract"
                    value={this.state.book?.abstract || ''}
                    onChange={(event) => this.handleChangeEvent(event)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>

        <Navbar bg="light" variant="light" fixed="bottom">
          <Navbar.Collapse className="justify-content-start">
            {!this.state.isNew && (
              <>
                <Button
                  variant="danger"
                  onClick={() => this.showConfirmationDialog()}
                >
                  Delete
                </Button>
              </>
            )}
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Button
              variant="secondary"
              onClick={() => {
                this.closeBookForm();
              }}
            >
              Cancel
            </Button>
            {this.state.isNew && (
              <Button variant="success" onClick={() => this.createBook()}>
                Create
              </Button>
            )}
            {!this.state.isNew && (
              <>
                <Button variant="warning" onClick={() => this.editBook()}>
                  Save
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>

        <Modal show={this.state.showConfirmDeletion} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete this book?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are about to delete <b>{this.state.book?.title}</b>
            <br /> <br />
            This operation is not reversable!
            <br /> <br />
            Are you sure you want to proceed with the operation?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.closeConfirmationDialog()}
            >
              Close
            </Button>
            <Button variant="danger" onClick={() => this.deleteBook()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default () => {
  const { bookId } = useParams();
  const history = useHistory();
  return <BookForm bookId={bookId} history={history} />;
};
