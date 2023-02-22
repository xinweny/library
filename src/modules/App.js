import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

import Library from './Library';
import UI from './UI';
import UserAuthenticator from './UserAuthenticator';

class App {
	constructor() {
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

		this.ui = new UI();
		this.library = new Library(db);
		this.userAuth = new UserAuthenticator(this.ui, this.library);
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
