import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import BookDetails from './BookDetails';
import BookForm from './BookForm';
import BooksList from './BooksList';

class App extends Component {
  render() {
    const history = createBrowserHistory();
    return (
      <Router history={history}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">BookShelf</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/books/list">List</Nav.Link>
              {/* <Nav.Link href="/books/shelf">shelf</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/books/list">
            <BooksList />
          </Route>
          <Route path="/books/:bookId/edit">
            <BookForm />
          </Route>
          <Route path="/books/:bookId">
            <BookDetails />
          </Route>
          <Route path="/">
            <Redirect to="/books/list" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
