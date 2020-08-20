import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Table
  } from 'react-bootstrap';

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
    if (this.props.show && this.props.bookId !== null) {
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
                      <tr>
                        <td>Title</td>
                        <td>{this.state.book?.title}</td>
                      </tr>
                      <tr>
                        <td>Language</td>
                        <td>{this.state.book?.language}</td>
                      </tr>
                      <tr>
                        <td>Title OV</td>
                        <td>{this.state.book?.titleOV}</td>
                      </tr>
                      <tr>
                        <td>Languag OV</td>
                        <td>{this.state.book?.languageOV}</td>
                      </tr>
                      <tr>
                        <td>Author</td>
                        <td>{this.state.book?.author}</td>
                      </tr>
                      <tr>
                        <td>Year</td>
                        <td>{this.state.book?.year}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>{this.state.book?.category.name}</td>
                      </tr>
                      <tr>
                        <td>Collection</td>
                        <td>{this.state.book?.collection?.name}</td>
                      </tr>
                      <tr>
                        <td>Pages</td>
                        <td>{this.state.book?.pages}</td>
                      </tr>
                      <tr>
                        <td>Editorial</td>
                        <td>{this.state.book?.editorial}</td>
                      </tr>
                      <tr>
                        <td>ISBN</td>
                        <td>{this.state.book?.isbn}</td>
                      </tr>
                      <tr>
                        <td>URL</td>
                        <td>{this.state.book?.url}</td>
                      </tr>
                      <tr>
                        <td>Reading Dates</td>
                        <td>{this.state.book?.readingDates.join(' -- ')}</td>
                      </tr>
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
