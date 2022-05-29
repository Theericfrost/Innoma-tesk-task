import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { User } from "store/index";

const firebaseConfig = {
  apiKey: "AIzaSyA0Ams45tgNoalRGqGWoOsjhUqHn0Khnho",
  authDomain: "inomma-test-task.firebaseapp.com",
  projectId: "inomma-test-task",
  storageBucket: "inomma-test-task.appspot.com",
  messagingSenderId: "960659301822",
  appId: "1:960659301822:web:1e1c2ddea4bc3fadf6c5ef",
  measurementId: "G-8CM8STPW01",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export const getUsersFromFirebase = async () => {
  const docRef = collection(db, "users");

  const usersDocs = await getDocs(docRef);
  return usersDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as User[];
};

export const getUserFromFirebase = async (id: string) => {
  const docRef = doc(db, "users", id);

  const userDoc = await getDoc(docRef);
  return {
    ...userDoc.data(),
    id: userDoc.id,
  };
};

export const getCommunityFromFirebase = async () => {
  const docRef = collection(db, "community");

  const usersDocs = await getDocs(docRef);
  return usersDocs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as User[];
};

export const addUsersToCommunity = async (users: User[]) => {
  const docRef = collection(db, "community");
  users.forEach(async (user) => {
    await addDoc(docRef, {
      ...user,
    });
  });
};

export const deleteUserFromCommunity = async (id: string) => {
  const docRef = doc(db, "community", id);

  await deleteDoc(docRef);
};
