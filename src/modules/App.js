import Library from './Library';
import UI from './UI';

class App {
	constructor() {
		this.library = new Library();
		this.ui = new UI();
	}

	init() {
		this.ui.displayBooks(this.library);

		this.ui.bindAddBookButton();
		this.ui.bindSubmitButton(this.library.addBook.bind(this.library), this.library);
	}
}

export default App;
