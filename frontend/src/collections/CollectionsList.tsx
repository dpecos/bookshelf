import { History } from 'history';
import React, { Component } from 'react';
import {
  Alert,
  Button,
  Form,
  Modal,
  Nav,
  Navbar,
  Table,
  Toast,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

interface IProps {
  history: History;
}

interface IState {
  collections: any[];
  message: string | null;
  collection: any;
  showConfirmDeletion: boolean;
}
class CollectionsList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      collections: [],
      message: null,
      collection: null,
      showConfirmDeletion: false,
    };
  }

  componentDidMount() {
    this.fetchCollections();
  }

  async fetchCollections() {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/collections`
    )
      .then((response) => response.json())
      .then((json) => this.setState({ collections: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving collections' })
      );
  }

  showEditDialog(collection: any) {
    this.setState({ collection });
  }

  hideEditDialog() {
    this.setState({ collection: null });
  }

  async handleChangeEvent(event: any) {
    if (event) {
      const collection = this.state.collection;
      const field = event.target.id;
      const value = event.target.value || null;

      collection[field] = value;

      this.setState({ collection });
    }
  }

  async saveCollection() {
    let url = null;
    let method = null;

    if (this.state.collection.id) {
      url = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/collections/${this.state.collection.id}`;
      method = 'put';
    } else {
      url = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/collections`;
      method = 'post';
    }

    const response = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.collection),
    });

    if (response.ok) {
      this.hideEditDialog();
      this.fetchCollections();
    } else {
      const json = await response.json();
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  async deleteCollection() {
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/collections/${this.state.collection.id}`,
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
      this.fetchCollections();
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
          <Navbar.Brand>Collections</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button variant="success" onClick={() => this.showEditDialog({})}>
                New collection
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
              <th>Name</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {this.state.collections.length === 0 ? (
              <tr>
                <td colSpan={6}>Loading collections...</td>
              </tr>
            ) : (
              this.state.collections.map((collection) => (
                <tr
                  key={collection.id}
                  onClick={() => this.showEditDialog(collection)}
                >
                  <td>
                    <Link
                      to={`/books/list?collection=${collection.id}`}
                      onClick={(evt) => evt.stopPropagation()}
                    >
                      {collection?.name}
                    </Link>
                  </td>
                  <td>{collection?.link}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Modal
          show={!!this.state.collection}
          animation={false}
          onHide={() => this.hideEditDialog()}
        >
          <Modal.Header closeButton>
            {!!this.state.collection?.id && (
              <Modal.Title>Edit collection</Modal.Title>
            )}
            {!this.state.collection?.id && (
              <Modal.Title>New collection</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name" key="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={this.state.collection?.name || ''}
                  onChange={(event) => this.handleChangeEvent(event)}
                />
              </Form.Group>
              <Form.Group controlId="link" key="link">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Link"
                  value={this.state.collection?.link || ''}
                  onChange={(event) => this.handleChangeEvent(event)}
                />
              </Form.Group>
              <Form.Group controlId="description" id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={15}
                  placeholder="Description"
                  value={this.state.collection?.description || ''}
                  onChange={(event) => this.handleChangeEvent(event)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {!!this.state.collection?.id && (
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
            <Button variant="success" onClick={() => this.saveCollection()}>
              {this.state.collection?.id ? 'Save' : 'Create'}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showConfirmDeletion}
          animation={false}
          onHide={() => this.closeConfirmationDialog()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete this collection?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are about to delete <b>{this.state.collection?.name}</b>
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
            <Button variant="danger" onClick={() => this.deleteCollection()}>
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
  return <CollectionsList history={history} />;
};
