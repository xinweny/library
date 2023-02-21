import Book from './Book';
import UI from './UI';

class Library {
	constructor() {
		this.books = [];
		this.books.push(
			new Book("Ducks: And How To Make Them Pay", 'William Cook', 1894, 188, true),
			new Book("How to Teach Quantum Physics to your Dog", 'Chad Orzel', 2010, 256, true),
			new Book("Raccoons Are The Brightest People", 'Sterling North', 1966, 192, false));
	}

	addBook(obj) {
		const book = new Book(
			obj.title,
			obj.author,
			obj.year,
			obj.pages,
			obj.isRead,
		);
	
		this.books.push(book);

		return book;
	}

	removeBook(id) {
		const index = this.books.findIndex((book) => book.id === id);
		this.books.splice(index, 1);
	}

	updateReadStatus(id) {
		const book = this.books.find((book) => book.id === id);
		book.isRead = !book.isRead;
	}
}

export default Library;
