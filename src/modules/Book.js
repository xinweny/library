import uniqid from 'uniqid';

class Book {
	constructor(title, author, year, pages, isRead=false) {
		this.title = title;
		this.author = author;
		this.year = year;
		this.pages = pages;
		this.isRead = isRead;
		this.id = uniqid();
	}
}

export default Book;
