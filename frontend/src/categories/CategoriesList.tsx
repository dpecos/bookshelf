import { History } from 'history';
import React, { Component } from 'react';
import { Nav, Navbar, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

interface IProps {
  history: History;
}

interface IState {
  categories: any[];
}
class CategoriesList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    fetch('http://localhost:8080/api/categories')
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }));
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
