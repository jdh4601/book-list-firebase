import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

// 컬렉션에 접근하기
const bookCollectionRef = collection(db, 'books');

// 1. 모든 책 가져오기
export const getAllBooks = () => {
  return getDocs(bookCollectionRef); // 컬렉션 읽기
};
// 2. 책 한권 가져오기
export const getBook = id => {
  const bookDoc = doc(db, 'books', id); // 특정 id doc에 접근
  return getDoc(bookDoc); // 가져옴
};
// 3. Add books
export const addBooks = newBook => {
  // new book을 컬렉션 안에 추가한다
  return addDoc(bookCollectionRef, newBook);
};
// 4. Update book
export const updateBook = (id, updatedBook) => {
  const bookDoc = doc(db, 'books', id); // 특정 id doc에 접근
  return updateDoc(bookDoc, updatedBook);
};
// 5. Delete book -> id
export const deleteBook = id => {
  const bookDoc = doc(db, 'books', id); // 특정 id doc에 접근
  return deleteDoc(bookDoc);
};
