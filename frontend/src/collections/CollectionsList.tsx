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
} from 'react-bootstrap';

interface IProps {
  history: History;
}

interface IState {
  collections: any[];
  message: string | null;
}
class CollectionsList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      collections: [],
      message: null,
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
