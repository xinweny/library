import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

class UserAuthenticator {
	constructor(ui) {
		this.ui = ui;
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

	authStateObserver(user) {
		if (user) {
			const profilePicUrl = getAuth().currentUser.photoURL || '#';
			const userName = getAuth().currentUser.displayName;

			this.ui.showSignIn(profilePicUrl, userName);
		} else {
			this.ui.showSignOut();
		}
	}
}

export default UserAuthenticator;