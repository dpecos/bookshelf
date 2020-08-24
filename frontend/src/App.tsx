import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, Redirect, Route, Router, Switch } from 'react-router-dom';
import './App.css';
import BookDetails from './BookDetails';
import BookForm from './BookForm';
import BooksList from './BooksList';

class App extends Component {
  render() {
    const history = createBrowserHistory();
    return (
      <Router history={history}>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">
            BookShelf
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/books/list">
                Books
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/collections">
                Collections
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="https://github.com/dpecos/bookshelf">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/books/list">
            <BooksList />
          </Route>
          <Route path="/books/new">
            <BookForm />
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
