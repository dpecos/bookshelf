import { History } from 'history';
import React, { Component } from 'react';
import { Nav, Navbar, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

interface IProps {
  history: History;
}

interface IState {
  collections: any[];
}
class CollectionsList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      collections: [],
    };
  }

  componentDidMount() {
    this.fetchCollections();
  }

  async fetchCollections() {
    fetch('http://localhost:8080/api/collections')
      .then((response) => response.json())
      .then((json) => this.setState({ collections: json }));
  }

  render() {
    return (
      <>
        <Navbar>
          <Navbar.Brand>Collections</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/collections/new">
                New collection
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
                <tr key={collection.id}>
                  <td>{collection.name}</td>
                  <td>{collection.link}</td>
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
  return <CollectionsList history={history} />;
};
