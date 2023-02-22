import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import placeholder from '../assets/placeholder-avatar.png';

class UserAuthenticator {
	constructor(ui, library) {
		this.ui = ui;
		this.library = library;
	}

	initFirebaseAuth() {
		onAuthStateChanged(getAuth(), this.authStateObserver.bind(this));
	}

	async signInUser() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(getAuth(), provider);
	}

	signOutUser() {
		signOut(getAuth());
	}

	isUserSignedIn() {
		return !!getAuth().currentUser;
	}

	async authStateObserver(user) {
		if (user) {
			const userName = this.getCurrentUser().displayName;
			const profilePicUrl = this.getCurrentUser().photoURL || placeholder;

			this.ui.showSignIn(profilePicUrl, userName);

			await this.library.init(user);
		} else {
			this.ui.showSignOut();
			this.library.init();
		}

		this.ui.displayBooks(this.library);
	}

	getCurrentUser() {
		return getAuth().currentUser;
	}
}

export default UserAuthenticator;