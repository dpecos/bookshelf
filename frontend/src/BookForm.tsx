import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row
  } from 'react-bootstrap';

interface IProps {
  show: boolean;
  bookId: any;
  hideForm: () => void;
}

interface IState {
  book: any;
}

export class BookForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      book: null,
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.show && this.props.bookId !== null) {
      this.fetchBookDetails();
    }
  }

  fetchBookDetails() {
    fetch(`http://localhost:8080/api/books/${this.props.bookId}`)
      .then((response) => response.json())
      .then((json) => this.setState({ book: json }));
  }

  hideBookForm() {
    this.props.hideForm();
  }

  storeBook() {
    // fetch({ method: 'put', url: 'http://localhost:8080/api/books' });
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
            <Row>
              <Col lg="6">
                <Form>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      value={this.state.book?.title}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col lg="6">
                <img
                  alt={this.state.book?.title}
                  src={`http://localhost:8080/api/books/${this.state.book?.id}/cover`}
                  width="350px"
                />
              </Col>
            </Row>
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
          <Button variant="primary" onClick={() => this.storeBook()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
