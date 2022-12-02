import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import {
  deleteDoc,
  orderBy,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9dhS24AYBpLq5R-5_dGkBdmTqAKkQUbI",
  authDomain: "post-update-crud.firebaseapp.com",
  projectId: "post-update-crud",
  storageBucket: "post-update-crud.appspot.com",
  messagingSenderId: "975241817437",
  appId: "1:975241817437:web:a68bed4cbf10fad796ccb4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const getPosts = async () => {
  const collectionRef = collection(db, "posts");
  const q = query(collectionRef, orderBy("created", "desc"));
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.map((item) => {
    return {
      ...item.data(),
      mainId: item.id,
    };
  });

  return categoryMap;
};
export const deletePost = async (uid) => {
  await deleteDoc(doc(db, "posts", uid));
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {}
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthChangeHandler = (callback) =>
  onAuthStateChanged(auth, callback);
