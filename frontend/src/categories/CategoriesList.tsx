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
  categories: any[];
  message: string | null;
  category: any;
  showConfirmDeletion: boolean;
}
class CategoriesList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      categories: [],
      message: null,
      category: null,
      showConfirmDeletion: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/categories`
    )
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }))
      .catch((err) =>
        this.setState({ message: 'Error retrieving categories' })
      );
  }

  showEditDialog(category: any) {
    this.setState({ category });
  }

  hideEditDialog() {
    this.setState({ category: null });
  }

  async handleChangeEvent(event: any) {
    if (event) {
      const category = this.state.category;
      const field = event.target.id;
      const value = event.target.value || null;

      category[field] = value;

      this.setState({ category });
    }
  }

  async saveCategory() {
    let url = null;
    let method = null;

    if (this.state.category.id) {
      url = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/${this.state.category.id}`;
      method = 'put';
    } else {
      url = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/categories`;
      method = 'post';
    }

    const response = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.category),
    });

    const json = await response.json();
    if (response.ok) {
      this.hideEditDialog();
      this.fetchCategories();
    } else {
      this.setState({ message: `${json.type.toUpperCase()}: ${json.message}` });
    }
  }

  async deleteCategory() {
    await fetch(
      `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/${this.state.category.id}`,
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
    this.fetchCategories();
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
          <Navbar.Brand>Categories</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button variant="success" onClick={() => this.showEditDialog({})}>
                New category
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
            {this.state.categories.length === 0 ? (
              <tr>
                <td colSpan={6}>Loading categories...</td>
              </tr>
            ) : (
              this.state.categories.map((category) => (
                <tr
                  key={category.id}
                  onClick={() => this.showEditDialog(category)}
                >
                  <td>
                    <Link
                      to={`/books/list?category=${category.id}`}
                      onClick={(evt) => evt.stopPropagation()}
                    >
                      {category?.name}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Modal
          show={!!this.state.category}
          animation={false}
          onHide={() => this.hideEditDialog()}
        >
          <Modal.Header closeButton>
            {!!this.state.category?.id && (
              <Modal.Title>Edit category</Modal.Title>
            )}
            {!this.state.category?.id && (
              <Modal.Title>New category</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name" key="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={this.state.category?.name || ''}
                  onChange={(event) => this.handleChangeEvent(event)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {!!this.state.category?.id && (
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
            <Button variant="success" onClick={() => this.saveCategory()}>
              {this.state.category?.id ? 'Save' : 'Create'}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showConfirmDeletion}
          animation={false}
          onHide={() => this.closeConfirmationDialog()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete this category?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are about to delete <b>{this.state.category?.name}</b>
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
            <Button variant="danger" onClick={() => this.deleteCategory()}>
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
  return <CategoriesList history={history} />;
};
