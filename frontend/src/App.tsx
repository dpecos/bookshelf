import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './App.css';
import BookDetails from './books/BookDetails';
import BookForm from './books/BookForm';
import CategoriesList from './categories/CategoriesList';
import CollectionsList from './collections/CollectionsList';
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import {
  BooksListConcise,
  BooksListDetailed,
  BooksListShelf,
} from './books/BooksList';

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
              <Nav.Link as={NavLink} to="/books/list">
                Books
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories/list">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/collections/list">
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
          <Route path="/books/list/detailed">
            <BooksListDetailed />
          </Route>
          <Route path="/books/list/shelf">
            <BooksListShelf />
          </Route>
          <Route path="/books/list">
            <BooksListConcise />
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

          <Route path="/categories/list">
            <CategoriesList />
          </Route>

          <Route path="/collections/list">
            <CollectionsList />
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
