import { History } from 'history';
import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './authors.css';
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
  Toast,
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

  fetchAuthor(id: string) {
    return new Promise((resolve, reject) => {
      fetch(
        `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors/${id}`
      )
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((err) => this.setState({ message: 'Error retrieving authors' }));
    });
  }

  async showEditDialog(authorRow: any) {
    const author = await this.fetchAuthor(authorRow.id);
    this.setState({ author });
  }

  hideEditDialog() {
    this.setState({ author: null });
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
      const author = this.state.author;
      const field = event.target.id;
      const value = event.target.value || null;

      if (field === 'photo') {
        author.photo = await this.convertImageToBase64(event.currentTarget);
      } else {
        author[field] = value;
      }

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

    if (response.ok) {
      this.hideEditDialog();
      this.fetchAuthors();
    } else {
      const json = await response.json();
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  async deleteAuthor() {
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors/${this.state.author.id}`,
      {
        method: 'delete',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      this.hideEditDialog();
      this.fetchAuthors();
    } else {
      const json = await response.json();
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }

    this.closeConfirmationDialog();
  }

  showConfirmationDialog() {
    this.setState({ showConfirmDeletion: true });
  }

  closeConfirmationDialog() {
    this.setState({ showConfirmDeletion: false });
  }

  dismissErrorMessage() {
    this.setState({ message: null });
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

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Year</th>
              <th>Nationality</th>
              <th>Link</th>
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
                    <img
                      id="authorPhotoSmall"
                      alt={author.name}
                      src={`${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/authors/${author.id}/photo`}
                      width="50px"
                      onError={(event: any) =>
                        (event.target.src =
                          '/img/author-photo-not-available.png')
                      }
                    />
                  </td>
                  <td>
                    <Link
                      to={`/books/list?author=${author.id}`}
                      onClick={(evt) => evt.stopPropagation()}
                    >
                      {author?.name}
                    </Link>
                  </td>
                  <td>{author?.year}</td>
                  <td>{author?.nationality}</td>
                  <td>{author?.link}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Modal
          show={!!this.state.author}
          animation={false}
          size="xl"
          onHide={() => this.hideEditDialog()}
        >
          <Modal.Header closeButton>
            {!!this.state.author?.id && <Modal.Title>Edit author</Modal.Title>}
            {!this.state.author?.id && <Modal.Title>New author</Modal.Title>}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col lg="6">
                  <Form.Group controlId="name" key="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={this.state.author?.name || ''}
                      onChange={(event) => this.handleChangeEvent(event)}
                    />
                  </Form.Group>
                  <Form.Group controlId="year" key="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      value={this.state.author?.year || ''}
                      onChange={(event) => this.handleChangeEvent(event)}
                    />
                  </Form.Group>
                  <Form.Group controlId="nationality" key="nationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nationality"
                      value={this.state.author?.nationality || ''}
                      onChange={(event) => this.handleChangeEvent(event)}
                    />
                  </Form.Group>
                  <Form.Group controlId="link" key="link">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link"
                      value={this.state.author?.link || ''}
                      onChange={(event) => this.handleChangeEvent(event)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <img
                    alt={this.state.author?.name}
                    src={
                      this.state.author?.photo ||
                      '/img/author-photo-not-available.png'
                    }
                    id="authorPhoto"
                  />
                  <Form.File
                    id="photo"
                    label="Author Photo"
                    custom
                    onChange={(event: any) => this.handleChangeEvent(event)}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Form.Group controlId="biography" id="authorBiography">
                    <Form.Label>Biography</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={7}
                      placeholder="Biography"
                      value={this.state.author?.biography || ''}
                      onChange={(event) => this.handleChangeEvent(event)}
                    />
                  </Form.Group>
                </Col>
              </Row>
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
