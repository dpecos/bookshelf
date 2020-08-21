import React, { Component } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

interface IProps {
  show: boolean;
  bookId: any;
  hideForm: () => void;
}

interface IState {
  book: any;
  collections: any;
  categories: any;
}

export class BookForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      book: null,
      collections: [],
      categories: [],
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.show && this.props.bookId !== null && !this.state.book) {
      this.fetchCollections();
      this.fetchCategories();
      this.fetchBookDetails();
    }
  }

  fetchCollections() {
    fetch(`http://localhost:8080/api/collections`)
      .then((response) => response.json())
      .then((json) => this.setState({ collections: json }));
  }

  fetchCategories() {
    fetch(`http://localhost:8080/api/categories`)
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }));
  }

  fetchBookDetails() {
    fetch(`http://localhost:8080/api/books/${this.props.bookId}`)
      .then((response) => response.json())
      .then((json) => this.setState({ book: json }));
  }

  hideBookForm() {
    this.props.hideForm();
  }

  async storeBook() {
    await fetch(`http://localhost:8080/api/books/${this.props.bookId}`, {
      method: 'put',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.book),
    });

    this.hideBookForm();
  }

  handleChangeEvent(event: any) {
    if (event) {
      const book = this.state.book;
      const field = event.target.id;
      book[field] = event.target.value;
      this.setState({ book });
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show && this.state.book !== null}
        animation={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => {
          this.hideBookForm();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit {this.state.book?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Row>
                <Col lg="6">
                  {[
                    { id: 'title', label: 'Title' },
                    { id: 'titleOV', label: 'Title OV' },
                    {
                      id: 'language',
                      label: 'Language',
                      options: [
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                      ],
                    },
                    {
                      id: 'languageOV',
                      label: 'Language OV',
                      options: [
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                      ],
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
                    { id: 'readingDates', label: 'Reading Dates' },
                  ].map((field) => {
                    if (field.options) {
                      return (
                        <Form.Group controlId={field.id} key={field.id}>
                          <Form.Label>{field.label}</Form.Label>
                          <Form.Control
                            as="select"
                            placeholder={field.label}
                            value={this.state.book?.[field.id] || ''}
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
                            value={this.state.book?.[field.id] || ''}
                            onChange={(event) => this.handleChangeEvent(event)}
                          />
                        </Form.Group>
                      );
                    }
                  })}
                </Col>
                <Col lg="6">
                  <img
                    alt={this.state.book?.title}
                    src={`http://localhost:8080/api/books/${this.state.book?.id}/cover`}
                    width="350px"
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              this.hideBookForm();
            }}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={() => this.storeBook()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
