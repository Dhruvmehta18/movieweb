import firebase from "firebase/app";
import 'firebase/auth';

export const authenticator = {
  isAuthenticated: false,
  persistenceAuth: firebase.auth.Auth.Persistence.SESSION,
  setFirebasePersistence(persistence, callback, callBackError) {
    const tempPersistenceAuth = persistence
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;
    firebase
      .auth()
      .setPersistence(tempPersistenceAuth)
      .then(() => {
        authenticator.persistenceAuth = tempPersistenceAuth;
        callback();
      })
      .catch(callBackError);
  },
  signInWithEmailPassword(email = "", password = "", cb, callBackError) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then((user) => {
        cb(user);
        authenticator.isAuthenticated = true;
        callBackError(null);
      })
      .catch(callBackError);
  },
  signUpWithEmailPassword(email = "", password = "", cb, callBackError) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((user) => {
        cb(user);
        authenticator.isAuthenticated = true;
        callBackError(null);
      })
      .catch(callBackError);
  },
  signInWithGoogle(cb, callBackError) {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        cb(result.user);
        callBackError(null);
        authenticator.isAuthenticated = true;
      })
      .catch(callBackError);
  },
  signInWithFacebook(cb, callBackError) {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(function (result) {
        cb(result.user);
        authenticator.isAuthenticated = true;
      })
      .catch(callBackError);
  },
  passwordReset(emailAddress="", cb, callBackError) {
    var auth = firebase.auth();
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(()=>cb())
      .catch(callBackError);
  },
  signout(cb) {
    authenticator.isAuthenticated = false;
    authenticator.persistenceAuth = firebase.auth.Auth.Persistence.SESSION
    firebase
      .auth()
      .signOut()
      .then(() => {
        cb();
      })
      .catch(() => {
        console.error("Some error occurred");
        cb();
      });
  },
};
