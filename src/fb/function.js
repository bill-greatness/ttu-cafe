// auth functions

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  updateDoc,
  getCountFromServer,
  setDoc,
  getDoc,
  doc,
  serverTimestamp,
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "./config";

export const signIn = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const createNewUser = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const logOut = async () => {
  return signOut(auth).then(() => localStorage.clear());
};

// firestore functions

export const insertData = async ({ data, docID, path, setResponse }) => {
  setResponse({ loading: true, open: false });
  const docRef = doc(db, path, docID ? docID : new Date().getTime().toString());
  setDoc(docRef, { ...data, timeStamp: serverTimestamp() })
    .then(() =>
      setResponse({
        open: true,
        message: "Data successfully added",
        type: "success",
        loading: false,
      })
    )
    .catch((err) =>
      setResponse({
        open: true,
        message: err.message,
        type: "error",
        loading: false,
      })
    );
};

export const updateData = async ({ id, data, path, setResponse }) => {
  setResponse({ loading: true, open: false });
  const updateRef = doc(db, path, id);
  updateDoc(updateRef, data)
    .then(() =>
      setResponse({
        open: true,
        message: "Data successfully updated",
        type: "success",
        loading: false,
      })
    )
    .catch((err) =>
      setResponse({
        open: true,
        message: err.message,
        type: "error",
        loading: false,
      })
    );
};

export const findDocument = async ({ path, id, getData }) => {
  const docRef = doc(db, path, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists) {
    getData(snapshot.data());
    return;
  }
  getData(null);
};

export const readDocuments = ({ path, getData }) => {
  const getQuery = query(collection(db, path));
  onSnapshot(getQuery, (qss) => {
    let temp = [];
    qss.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    getData(temp);
    temp = [];
  });
};

export const searchQuery = ({ path, type, searchString, getData }) => {
  const sQ = query(collection(db, path), where(type, "==", searchString));
  onSnapshot(sQ, (qss) => {
    let temp = [];
    qss.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    getData(temp);
    temp = [];
  });
};

export const getDocument = ({ path, id, getData }) => {
  const getDoc = doc(db, path, id);
  onSnapshot(getDoc, (doc) => getData(doc.data()));
};

export const putDocument = ({ path, id, data, setResponse }) => {};

export const getCounts = async (path) => {
  const colRef = collection(db, path);
  const snapshot = await getCountFromServer(colRef);
  return snapshot.data().count || 0;
};

// upload multiples files to firebase and put all the urls into an array
export const uploadFiles = async ({ path, files, setData, setUploading }) => {
    
  let urls = [];
  setUploading(true);
  for (let file of files) {
    const fileRef = ref(storage, path + "-" + new Date().getTime().toString());
    await uploadBytes(fileRef, file).then(() => {
      getDownloadURL(fileRef).then((url) => urls.push(url));
    });
  }

  setData(prev => ({...prev, photos:urls}))

  setUploading(false);
};

export const deleteDocument = async ({ path, id, setResponse }) => {
  const deleteRef = doc(db, path, id);
  await deleteDoc(deleteRef)
    .then(() =>
      setResponse({
        open: true,
        type: "success",
        message: "Deleted successfully",
      })
    )
    .catch((err) =>
      setResponse({ open: true, message: err.message, type: "error" })
    );
};
