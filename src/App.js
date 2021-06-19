import React, { useState, useEffect } from 'react';

// Components
import Button from './components/Button';
import Channel from './components/Channel';

// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyAD0RGd3wfSTRbfTscK2FdgRL6BHqfBSEs",
  authDomain: "ccrchat-e4996.firebaseapp.com",
  projectId: "ccrchat-e4996",
  storageBucket: "ccrchat-e4996.appspot.com",
  messagingSenderId: "41928426673",
  appId: "1:41928426673:web:9af732e0ce1414f3ca4e90"
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null);
    })
    
    if(initializing) setInitializing(false);

    // Cleanup subscription
    return unsubscribe;
  }, [])

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    auth.useDeviceLanguage();
    // Start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch(error) {
      alert('Something went wrong. Try another account!!');
    }

  }

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch(error) {
      console.log(error.message);
    }
  }

  if(initializing) return 'Loading...'

  return (
    <div>
      { user ? (
          <>
            <Button onClick={signOut}>Sign Out</Button>
            <Channel user={user} db={db} />
          </>
        ) : (
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        )}
    </div>
  );
}

export default App;
