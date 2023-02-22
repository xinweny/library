import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import App from './modules/App';

import './style.css';

const firebaseConfig = {
	apiKey: "AIzaSyAB3aiiquiY_XulEajIudCghHiTgxwrAwQ",
  authDomain: "library-79709.firebaseapp.com",
  projectId: "library-79709",
  storageBucket: "library-79709.appspot.com",
  messagingSenderId: "863865949893",
  appId: "1:863865949893:web:13cd5e9262283d023e2aac",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const libraryApp = new App(db);
libraryApp.init();
