import { History } from 'history';
import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Alert,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
  Table,
  Button,
} from 'react-bootstrap';

interface IProps {
  history: History;
}

interface IState {
  categories: any[];
  message: string | null;
}
class CategoriesList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      categories: [],
      message: null,
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

  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand>Categories</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Button as={Link} to="/categories/new" variant="success">
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
                <tr key={category.id}>
                  <td>{category.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </>
    );
  }
}

export default () => {
  const history = useHistory();
  return <CategoriesList history={history} />;
};
