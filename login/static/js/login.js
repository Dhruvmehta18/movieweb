/**
     * Function called when clicking the Login/Logout button.
     */
    // [START buttoncallback]
    function logInWithGoogle() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
      }
      // [START_EXCLUDE]
      document.getElementById('login-form').disabled = true;
      // [END_EXCLUDE]
    }
    // [END buttoncallback]
    function logInWithFacebook() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.FacebookAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('user_likes');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      // [START_EXCLUDE]
      document.getElementById('login-form').disabled = true;
      // [END_EXCLUDE]
    }
    // [END buttoncallback]
    function logIn(event) {
      event.preventDefault();
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        // Sign in with email and pass.
          if(!validateEmail(email)){
            alert('Invalid Email Address');
            return false;
          }
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('submit').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
     document.getElementById('submit').disabled = true;
      document.getElementById('login-form').disabled = true;
        return false;
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
     *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
     */
    function initApp() {
      // Result from Redirect auth flow.
      // [START getidptoken]
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // [START_EXCLUDE]
        } else {
          // [END_EXCLUDE]
        }
        // The signed-in user info.
          const user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END getidptoken]

      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            const providerData = user.providerData;
            // [START_EXCLUDE]
          // [END_EXCLUDE]
            // similar behavior as an HTTP redirect
            window.location.href = '../';
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        // [END_EXCLUDE]
      });
      // [END authstatelistener]

      document.getElementById('google-login').addEventListener('click', logInWithGoogle, false);
      document.getElementById('facebook-login').addEventListener('click', logInWithFacebook, false);
      document.getElementById('submit').addEventListener('click', logIn, false);
    }

    window.onload = function() {
      initApp();
    };
