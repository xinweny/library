import Book from './Book';

import {
	collection,
	query,
	doc,
	addDoc,
	serverTimestamp,
	where,
	getDocs,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore/lite';

class Library {
	constructor(db) {
		this.db = db;
		this.booksRef = collection(this.db, 'books');

		this.books = [];
		this.user = null;
	}

	async init(user) {
		this.books = [];

		if (user) {
			this.user = user;
			const q = query(this.booksRef, where('uid', '==', user.uid));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				const data = doc.data();

				this.books.push(new Book(
					data.title,
					data.author,
					data.year,
					data.pages,
					data.isRead,
					doc.id
				));
			});
		} else {
			this.user = null;
			this.books.push(
				new Book("Ducks: And How To Make Them Pay", 'William Cook', 1894, 188, true),
				new Book("How to Teach Quantum Physics to your Dog", 'Chad Orzel', 2010, 256, true),
				new Book("Raccoons Are The Brightest People", 'Sterling North', 1966, 192, false));
		}
	}

	async addBook(obj) {
		const book = new Book(
			obj.title,
			obj.author,
			obj.year,
			obj.pages,
			obj.isRead,
		);

		if (this.user) {
			const bookObj = {
				...book,
				uid: this.user.uid,
				timestamp: serverTimestamp(),
			}
	
			try {
				await addDoc(this.booksRef, bookObj);
			} catch (error) {
				console.error('Error writing new book entry to the Firebase database: ', error);
			}
		}
	
		this.books.push(book);

		return book;
	}

	async removeBook(id) {
		const index = this.books.findIndex((book) => book.id === id);
		this.books.splice(index, 1);

		if (this.user) {
			const docRef = doc(this.db, 'books', id);
			await deleteDoc(docRef);
		}
	}

	async updateReadStatus(id) {
		const book = this.books.find((book) => book.id === id);
		book.isRead = !book.isRead;

		if (this.user) {
			const docRef = doc(this.db, 'books', id);
			await updateDoc(docRef, { isRead: book.isRead });
		}
	}
}

export default Library;
