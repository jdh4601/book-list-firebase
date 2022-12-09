import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getAllBooks, deleteBook } from '../services/book.services';
import { BiRefresh } from 'react-icons/bi';
import { BsTrashFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

const BookList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks(); // 처음 한번만 호출
  }, []);

  // 현재 가지고 있는 collection 모두 가져옴
  const getBooks = async () => {
    const data = await getAllBooks(); // getDocs로 가져온 컬렉션 데이터들
    console.log(data.docs);
    setBooks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async id => {
    await deleteBook(id);
    getBooks();
  };

  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
          <BiRefresh size={30} />
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>저자</th>
            <th>날짜</th>
            <th>상태</th>
            <th>편집</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.date}</td>
                <td>{doc.status}</td>
                <td>
                  <Button variant="primary" onClick={() => getBookId(doc.id)}>
                    <AiOutlineEdit size={15} />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(doc.id)}
                  >
                    <BsTrashFill size={15} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BookList;
