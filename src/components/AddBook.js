import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Alert, Button, ButtonGroup } from 'react-bootstrap';
import { getBook, addBooks, updateBook } from '../services/book.services';

const AddBooks = ({ id, setBookId }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('✅');
  const [flag, setFlag] = useState(true);
  // error message 상태에 따라 관리하기
  const [message, setMessage] = useState({ error: false, msg: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    // 값이 비어있을 때
    if (title === '' || author === '' || date === '') {
      setMessage({ error: true, msg: '모든 빈칸을 입력해주세요' });
    }
    // 업데이트/추가 할 때 넣어줄 obj
    const newBook = {
      title,
      author,
      date,
      status,
    };
    console.log(newBook);
    // 에러 처리: 값이 비었을 때
    try {
      if (id !== undefined && id !== '') {
        // 1. update new book
        await updateBook(id, newBook);
        setBookId(''); // 초기화
        setMessage({
          error: false,
          msg: '성공적으로 업데이트 되었습니다! 🎉 🎉 이제 아래의 새로고침🔄 버튼을 눌러주세요',
        });
      } else {
        await addBooks(newBook);
        setMessage({
          error: false,
          msg: '성공적으로 새로운 책이 목록에 추가되었습니다! 🎉 🎉 이제 아래의 새로고침🔄 버튼을 눌러주세요',
        });
      }
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }
    // 인풋값 비워주기
    setTitle('');
    setAuthor('');
    setDate('');
  };

  const editHandler = async () => {
    setMessage('');
    try {
      const docSnap = await getBook(id);
      console.log(docSnap.data());
      setTitle(docSnap.data().author);
      setAuthor(docSnap.data().title);
      setDate(docSnap.data().date);
      setStatus(docSnap.data().status);
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }
  };

  useEffect(() => {
    console.log('The id here is : ', id);
    if (id !== undefined && id !== '') {
      editHandler();
    }
  }, id);

  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? 'danger' : 'success'}
            onClose={() => setMessage('')}
            dismissible
          >
            {message?.msg}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTItle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">제목 📕</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="책 제목을 입력해 주세요"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">저자 🙋‍♂️</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="저자를 입력해 주세요"
                value={author}
                onChange={event => setAuthor(event.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookDate">
            <InputGroup>
              <InputGroup.Text id="formBookDate">날짜 🗓</InputGroup.Text>
              <Form.Control
                type="date"
                value={date}
                onChange={event => setDate(event.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className="flex flex-row justify-between">
            <ButtonGroup className="mb-3">
              <Button
                disabled={flag}
                variant="success"
                onClick={() => {
                  setStatus('✅');
                  setFlag(true);
                }}
              >
                완독 ✅
              </Button>
              <Button
                variant="secondary"
                disabled={!flag}
                onClick={() => {
                  setStatus('🏃‍♂️');
                  setFlag(false);
                }}
              >
                진행 🏃‍♂️
              </Button>
            </ButtonGroup>
            <div>
              <Button variant="primary" type="Submit">
                목록에 추가하기 +
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBooks;
