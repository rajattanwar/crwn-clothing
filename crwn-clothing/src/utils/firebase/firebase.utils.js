// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfPYY5gHJMBKTw3iVM8o1_CGxg2YBVAhA",
  authDomain: "crwn-clothing-db-2715e.firebaseapp.com",
  projectId: "crwn-clothing-db-2715e",
  storageBucket: "crwn-clothing-db-2715e.appspot.com",
  messagingSenderId: "863187026812",
  appId: "1:863187026812:web:68616fa4495a145c09daf9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider= new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db= getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName, createdAt,email});
        }catch(error){
            console.log(`error creating the user`, error.message);
        }
    }

    return userDocRef;
}