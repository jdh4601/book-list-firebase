import React, { useState } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import BookList from './components/BookList';
import AddBooks from './components/AddBook';
import './App.css';
import { BsBook } from 'react-icons/bs';

function App() {
  const [bookId, setBookId] = useState('');

  const getBookIdHandler = id => {
    console.log(id);
    setBookId(id);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">
            <h1 className="flex flex-row mt-3 ml-2">
              <BsBook className="mt-1" />
              <p className="ml-3">
                My <span className="font-bold text-sky-400">Book</span> List
              </p>
            </h1>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: '400px' }}>
        <Row>
          <Col>
            <AddBooks id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BookList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
