import React, { Component } from 'react';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';

interface IProps {
  show: boolean;
  bookId: any;
  editBook: (book: any) => void;
  hideDetails: () => void;
}

interface IState {
  book: any;
}

export class BookDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      book: null,
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.show && this.props.bookId !== null && !this.state.book) {
      this.fetchBookDetails();
    }
  }

  fetchBookDetails() {
    fetch(`http://localhost:8080/api/books/${this.props.bookId}`)
      .then((response) => response.json())
      .then((json) => this.setState({ book: json }));
  }

  hideBookDetails() {
    this.props.hideDetails();
  }

  editBook() {
    this.props.editBook(this.state.book);
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.show && this.state.book !== null}
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
                      {[
                        { id: 'title', label: 'Title' },
                        { id: 'titleOV', label: 'Title OV' },
                        { id: 'language', label: 'Language' },
                        { id: 'languageOV', label: 'Language OV' },
                        { id: 'author', label: 'Author' },
                        { id: 'year', label: 'Year' },
                        {
                          id: 'category',
                          label: 'Category',
                          value: this.state.book?.category.name,
                        },
                        {
                          id: 'collection',
                          label: 'Collection',
                          value: this.state.book?.collection.name,
                        },
                        { id: 'pages', label: 'Pages' },
                        { id: 'editorial', label: 'Editorial' },
                        { id: 'isbn', label: 'ISBN' },
                        { id: 'url', label: 'URL' },
                        {
                          id: 'readingDates',
                          label: 'Reading Dates',
                          value: this.state.book?.readingDates.join(' -- '),
                        },
                      ].map((field) => (
                        <tr key={field.id}>
                          <td>{field.label}</td>
                          <td>
                            {field.value || this.state.book?.[field.id] || ''}
                          </td>
                        </tr>
                      ))}
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
            <Button variant="primary" onClick={() => this.editBook()}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
