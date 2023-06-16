// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
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

const googleProvider= new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db= getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName, createdAt,email,...additionalInformation});
        }catch(error){
            console.log(`error creating the user`, error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);