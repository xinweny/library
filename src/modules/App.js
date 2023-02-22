import Library from './Library';
import UI from './UI';
import UserAuthenticator from './UserAuthenticator';

class App {
	constructor(db) {
		this.library = new Library(db);
		this.ui = new UI();
		this.userAuth = new UserAuthenticator(this.ui);
	}

	init() {
		// Authentication
		this.userAuth.initFirebaseAuth();
		this.ui.bindSignInButton(this.userAuth.signInUser.bind(this.userAuth));
		this.ui.bindSignOutButton(this.userAuth.signOutUser.bind(this.userAuth));

		this.ui.displayBooks(this.library);

		this.ui.bindAddBookButton();
		this.ui.bindSubmitButton(this.library.addBook.bind(this.library), this.library);
		this.ui.bindCloseFormButton();
	}
}

export default App;
