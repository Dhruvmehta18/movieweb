import firebase from "firebase/app";
import "firebase/auth";

const setFirebasePersistence = (persistenceType = false, callback, callBackError) => {
    const tempPersistenceAuth = persistenceType
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
}

const signInWithEmailPassword = (email = "", password = "", cb, callBackError) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then((user) => {
            cb(user);
            authenticator.isAuthenticated = true;
            callBackError(null);
        })
        .catch(callBackError);
}

const signUpWithEmailPassword = (email = "", password = "", cb, callBackError) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((user) => {
            cb(user);
            authenticator.isAuthenticated = true;
            callBackError(null);
        })
        .catch(callBackError);
}

const signInWithGoogle = (cb, callBackError) => {
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
}

const signInWithFacebook = (cb, callBackError) => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then(function (result) {
            cb(result.user);
            authenticator.isAuthenticated = true;
        })
        .catch(callBackError);
}

const passwordReset = (emailAddress = "", cb, callBackError) => {
    const auth = firebase.auth();
    auth
        .sendPasswordResetEmail(emailAddress)
        .then(() => cb())
        .catch(callBackError);
}

const signOut = (cb) => {
    authenticator.isAuthenticated = false;
    authenticator.persistenceAuth = firebase.auth.Auth.Persistence.SESSION;
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
}

export const authenticator = {
    isAuthenticated: false,
    persistenceAuth: firebase.auth.Auth.Persistence.SESSION,
    setFirebasePersistence: setFirebasePersistence,
    signInWithEmailPassword: signInWithEmailPassword,
    signUpWithEmailPassword: signUpWithEmailPassword,
    signInWithGoogle: signInWithGoogle,
    signInWithFacebook: signInWithFacebook,
    passwordReset: passwordReset,
    signOut: signOut,
};
