import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import { BooksList } from './BooksList';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <BooksList></BooksList>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
