import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import { BookDetails } from './BookDetails';
import { BooksList } from './BooksList';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <BooksList></BooksList>
            <BookDetails></BookDetails>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
