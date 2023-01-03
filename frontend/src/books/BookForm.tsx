import bsCustomFileInput from 'bs-custom-file-input';
import { History } from 'history';
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Navbar,
  Row,
  Toast,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import './books.css';
import { languages } from './languages';

interface IProps {
  history: History;
  bookId: string;
}

interface IState {
  book: any;
  isNew: boolean;
  pageTitle: string;
  authors: [];
  collections: [];
  categories: [];
  message: string | null;
  showConfirmDeletion: boolean;
  formValidated: boolean;
}

class BookForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      book: null,
      isNew: false,
      pageTitle: '',
      authors: [],
      collections: [],
      categories: [],
      message: null,
      showConfirmDeletion: false,
      formValidated: false,
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();

    this.fetchAuthors();
    this.fetchCollections();
    this.fetchCategories();

    if (this.props.bookId) {
      this.fetchBookDetails(this.props.bookId);
      this.setState({ isNew: false, pageTitle: 'Edit book' });
    } else {
      this.setState({ isNew: true, book: {}, pageTitle: 'New book' });
    }
  }

  fetchAuthors() {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors`
    )
      .then((response) => response.json())
      .then((json) => this.setState({ authors: json }))
      .catch((err) => this.setState({ message: 'Error retrieving authors' }));
  }

  fetchCollections() {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/collections`
    )
      .then((response) => response.json())
      .then((json) => this.setState({ collections: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving collections' })
      );
  }

  fetchCategories() {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/categories`
    )
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving categories' })
      );
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

  closeBookForm() {
    this.props.history.goBack();
  }

  checkForm(): boolean {
    const form: any = document.getElementById('bookForm');
    let formValid = false;
    if (form) {
      this.setState({ formValidated: true });
      formValid = form.checkValidity();
    }
    return formValid;
  }

  async createBook() {
    if (!this.checkForm()) {
      return;
    }

    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books`,
      {
        method: 'post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.book),
      }
    );

    const json = await response.json();
    if (response.ok) {
      this.props.history.push(`/books/${json.id}`);
    } else {
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  async editBook() {
    if (!this.checkForm()) {
      return;
    }

    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/${this.props.bookId}`,
      {
        method: 'put',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.book),
      }
    );

    if (response.ok) {
      this.closeBookForm();
    } else {
      const json = await response.json();
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  async deleteBook() {
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/books/${this.props.bookId}`,
      {
        method: 'delete',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      this.props.history.push('/');
    } else {
      const json = await response.json();
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  showConfirmationDialog() {
    this.setState({ showConfirmDeletion: true });
  }

  closeConfirmationDialog() {
    this.setState({ showConfirmDeletion: false });
  }

  convertImageToBase64(input: any): Promise<string> {
    return new Promise((resolve) => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  async handleChangeEvent(event: any) {
    if (event) {
      const book = this.state.book;
      const field = event.target.id;
      const value = event.target.value || null;

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
      } else if (field === 'authors') {
        // book.authors = [].slice.call(event.target.selectedOptions).map((item: any) => item.value).filter(Boolean)
        const selectedAuthors = [].slice.call(event.target.selectedOptions).map((item: any) => item.value).filter(Boolean)
        book.authors = this.state.authors.filter((author: any) => selectedAuthors.includes(author.id));
      } else {
        book[field] = value;
      }
      this.setState({ book });
    }
  }

  dismissErrorMessage() {
    this.setState({ message: null });
  }

  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand>{this.state.pageTitle}</Navbar.Brand>
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

        <Container>
          <Form id="bookForm" noValidate validated={this.state.formValidated}>
            <Row>
              <Col lg="6">
                <img
                  alt={this.state.book?.title}
                  src={
                    this.state.book?.cover ||
                    '/img/book-cover-not-available.jpg'
                  }
                  id="bookCover"
                />
                <Form.File
                  id="cover"
                  label="Book Cover"
                  custom
                  onChange={(event: any) => this.handleChangeEvent(event)}
                />
                <Form.Group controlId="abstract" id="bookAbstract">
                  <Form.Label>Abstract</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={15}
                    placeholder="Abstract"
                    value={this.state.book?.abstract || ''}
                    onChange={(event) => this.handleChangeEvent(event)}
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                {[
                  { id: 'title', label: 'Title', required: true },
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
                  {
                    id: 'authors',
                    label: 'Authors',
                    required: true,
                    options: this.state.authors.map((author: any) => {
                      return { value: author.id, label: author.name };
                    }),
                    multiple: true
                  },
                  { id: 'year', label: 'Year' },
                  {
                    id: 'category',
                    label: 'Category',
                    required: true,
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
                  { id: 'collectionNumber', label: 'Collection #' },
                  { id: 'pages', label: 'Pages' },
                  { id: 'editorial', label: 'Editorial' },
                  { id: 'isbn', label: 'ISBN' },
                  { id: 'link', label: 'Link' },
                  {
                    id: 'readingDates',
                    label: 'Reading Dates',
                    placeholder: 'Format: YYYY/MM, YYYY/MM...',
                    required: true,
                    value: this.state.book?.readingDates?.join(','),
                  },
                  {
                    id: 'rating',
                    label: 'Rating',
                    required: true,
                    options: [
                      { value: 1, label: '1 - Bad' },
                      { value: 2, label: '2 - Ok' },
                      { value: 3, label: '3 - Good' },
                      { value: 4, label: '4 - Great' },
                      { value: 5, label: '5 - Wow' },
                    ],
                  },
                ].map((field: any) => {
                  if (field.options) {
                    const value =
                      field.multiple ? this.state.book?.[field.id]?.map((f: any) => f.id) : (field.value ||
                        this.state.book?.[field.id]?.id ||
                        this.state.book?.[field.id] ||
                        '');

                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control
                          as="select"
                          required={field.required || false}
                          placeholder={field.placeholder || field.label}
                          multiple={field.multiple || false}
                          value={
                            field.multiple && !Array.isArray(value) ? [value] : value
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
                        {field.required && (
                          <Form.Control.Feedback type="invalid">
                            Please provide a {field.label.toLowerCase()}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    );
                  } else {
                    return (
                      <Form.Group controlId={field.id} key={field.id}>
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control
                          required={field.required || false}
                          type="text"
                          placeholder={field.placeholder || field.label}
                          value={
                            field.value || this.state.book?.[field.id] || ''
                          }
                          onChange={(event) => this.handleChangeEvent(event)}
                        />
                        {field.required && (
                          <Form.Control.Feedback type="invalid">
                            Please provide a {field.label.toLowerCase()}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    );
                  }
                })}
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
                <Button variant="success" onClick={() => this.editBook()}>
                  Save
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>

        <Modal
          show={this.state.showConfirmDeletion}
          animation={false}
          onHide={() => this.closeConfirmationDialog()}
        >
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
