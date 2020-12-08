import React, { useState } from "react";
import firebase from "firebase";

import { authenticator } from "./authenticate";
import {
  addUserIdentityObject,
  removeUserIdentityObject,
} from "../utility/localStorageUtility";

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [persistence, setPersistence] = useState(null);
  const [error, setError] = useState(null);

  const setUserFromProvider = (user, callback) => {
    setUser(user);
    callback();
  };

  const setOnErrorFromProvider = (error, callBackError) => {
    setError(error);
    callBackError(error);
  };

  const setPersistenceFirebase = (persistence, callback) => {
    setPersistence(persistence);
    callback();
  };

  React.useEffect(() => {
    const firebaseAuthListener = firebase.auth().onAuthStateChanged((user) => {
      // detaching the listener
      setUser(user);
      if (user) {
        addUserIdentityObject(user);
      } else {
        removeUserIdentityObject();
      }
    });
    return () => firebaseAuthListener(); // unsubscribing from the listener when the component is unmounting.
  }, [user, error]);

  const signInWithEmail = (email, password, callback, callBackError) => {
    return authenticator.signInWithEmailPassword(
      email,
      password,
      (user) => setUserFromProvider(user, callback),
      (error) => setOnErrorFromProvider(error, callBackError)
    );
  };

  const signUpWithEmail = (email, password, callback, callBackError) => {
    return authenticator.signUpWithEmailPassword(
      email,
      password,
      (user) => setUserFromProvider(user, callback),
      (error) => setOnErrorFromProvider(error, callBackError)
    );
  };

  const signInWithGoogle = (callback, callBackError) => {
    return authenticator.signInWithGoogle(
      (user) => setUserFromProvider(user, callback),
      (error) => setOnErrorFromProvider(error, callBackError)
    );
  };

  const signInWithFacebook = (callback, callBackError) => {
    return authenticator.signInWithFacebook(
      (user) => setUserFromProvider(user, callback),
      (error) => setOnErrorFromProvider(error, callBackError)
    );
  };

  const setPersistenceHelper = (
    persistentType = false,
    callback,
    callbackError
  ) => {
    return authenticator.setFirebasePersistence(
      () => setPersistenceFirebase(persistentType, callback),
      (error) => setOnErrorFromProvider(error, callbackError)
    );
  };

  const resetPassword = (emailAddress = "", callback, callbackError) => {
    return authenticator.passwordReset(emailAddress, callback, callbackError);
  };

  const signout = (callback) => {
    return authenticator.signout(() => {
      removeUserIdentityObject();
      setUser(null);
      callback();
    });
  };

  return {
    user,
    error,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInWithFacebook,
    signout,
    setPersistenceHelper,
    persistence,
    resetPassword
  };
}

export default useProvideAuth;
