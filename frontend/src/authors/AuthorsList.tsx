import { History } from 'history';
import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap';

interface IProps {
  history: History;
}

interface IState {
  authors: any[];
  message: string | null;
  author: any;
  showConfirmDeletion: boolean;
}
class AuthorsList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      authors: [],
      message: null,
      author: null,
      showConfirmDeletion: false,
    };
  }

  componentDidMount() {
    this.fetchAuthors();
  }

  async fetchAuthors() {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors`
    )
      .then((response) => response.json())
      .then((json) => this.setState({ authors: json }))
      .catch((err) => this.setState({ message: 'Error retrieving authors' }));
  }

  showEditDialog(author: any) {
    this.setState({ author });
  }

  hideEditDialog() {
    this.setState({ author: null });
  }

  async handleChangeEvent(event: any) {
    if (event) {
      const author = this.state.author;
      const field = event.target.id;
      const value = event.target.value || null;

      author[field] = value;

      this.setState({ author });
    }
  }

  async saveAuthor() {
    let url = null;
    let method = null;

    if (this.state.author.id) {
      url = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors/${this.state.author.id}`;
      method = 'put';
    } else {
      url = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors`;
      method = 'post';
    }

    const response = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.author),
    });

    const json = await response.json();
    if (response.ok) {
      this.hideEditDialog();
      this.fetchAuthors();
    } else {
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  async deleteAuthor() {
    await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors/${this.state.author.id}`,
      {
        method: 'delete',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    this.closeConfirmationDialog();
    this.hideEditDialog();
    this.fetchAuthors();
  }

  showConfirmationDialog() {
    this.setState({ showConfirmDeletion: true });
  }

  closeConfirmationDialog() {
    this.setState({ showConfirmDeletion: false });
  }

  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand>Authors</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button variant="success" onClick={() => this.showEditDialog({})}>
                New author
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.state.message && (
          <Container>
            <Row>
              <Col lg="12">
                <Alert key={'error'} variant={'danger'}>
                  <Alert.Heading>Oh no! There was an error!</Alert.Heading>
                  <p>{this.state.message}</p>
                </Alert>
              </Col>
            </Row>
          </Container>
        )}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.authors.length === 0 ? (
              <tr>
                <td colSpan={6}>Loading authors...</td>
              </tr>
            ) : (
              this.state.authors.map((author) => (
                <tr key={author.id} onClick={() => this.showEditDialog(author)}>
                  <td>
                    <Link
                      to={`/books/list?author=${author.id}`}
                      onClick={(evt) => evt.stopPropagation()}
                    >
                      {author?.name}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Modal
          show={!!this.state.author}
          animation={false}
          onHide={() => this.hideEditDialog()}
        >
          <Modal.Header closeButton>
            {!!this.state.author?.id && <Modal.Title>Edit author</Modal.Title>}
            {!this.state.author?.id && <Modal.Title>New author</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name" key="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={this.state.author?.name || ''}
                  onChange={(event) => this.handleChangeEvent(event)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {!!this.state.author?.id && (
              <Button
                variant="danger"
                className="mr-auto"
                onClick={() => this.showConfirmationDialog()}
              >
                Delete
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => {
                this.hideEditDialog();
              }}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={() => this.saveAuthor()}>
              {this.state.author?.id ? 'Save' : 'Create'}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showConfirmDeletion}
          animation={false}
          onHide={() => this.closeConfirmationDialog()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete this author?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are about to delete <b>{this.state.author?.name}</b>
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
            <Button variant="danger" onClick={() => this.deleteAuthor()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default () => {
  const history = useHistory();
  return <AuthorsList history={history} />;
};
