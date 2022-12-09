import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB2Ouw6blbBBGdIu9DmD-qjYQyO3ISKaR0',
  authDomain: 'practice-crud-67f9e.firebaseapp.com',
  projectId: 'practice-crud-67f9e',
  storageBucket: 'practice-crud-67f9e.appspot.com',
  messagingSenderId: '438811379915',
  appId: '1:438811379915:web:d2c6ac2a8ed98b8961734e',
  measurementId: 'G-0Q3SP5VJR5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
