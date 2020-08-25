import { History } from 'history';
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
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
    fetch(`http://localhost:8080/api/books/${bookId}`)
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
          <Row>
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
                      value: this.state.book?.collection?.name,
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
              {this.state.book && (
                <img
                  alt={this.state.book?.title}
                  src={`http://localhost:8080/api/books/${this.state.book?.id}/cover`}
                  width="350px"
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col lg={12}>{this.state.book?.abstract}</Col>
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
