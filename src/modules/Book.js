import uniqid from 'uniqid';

class Book {
	constructor(title, author, year, pages, isRead=false, id) {
		this.title = title;
		this.author = author;
		this.year = year;
		this.pages = pages;
		this.isRead = isRead;
		this.id = id || uniqid();
	}
}

export default Book;
