// Firebase Authentication helper for Google Sign-In
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * Initialize auth helpers with a Firebase app instance.
 * @param {import('firebase/app').FirebaseApp} firebaseApp
 * @returns {{ auth: import('firebase/auth').Auth, signInWithGoogle: ()=>Promise<import('firebase/auth').UserCredential>, signOutUser: ()=>Promise<void>, onAuthChange: (cb:Function)=>import('firebase/auth').Unsubscribe }}
 */
function initAuth(firebaseApp) {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const onAuthChange = (cb) => {
    return onAuthStateChanged(auth, (user) => cb(user));
  };

  return {
    auth,
    signInWithGoogle,
    signOutUser,
    onAuthChange,
  };
}

export { initAuth };
