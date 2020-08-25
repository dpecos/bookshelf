import { History } from 'history';
import React, { Component } from 'react';
import {
  Alert,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

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
    fetch('http://localhost:8080/api/categories')
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
              <Nav.Link as={Link} to="/categories/new">
                New category
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
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
