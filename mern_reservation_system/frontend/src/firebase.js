// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeWxPMixXLbOw2wIKsskJQEew9rRW-gsw",
  authDomain: "storage-4cbdf.firebaseapp.com",
  projectId: "storage-4cbdf",
  storageBucket: "storage-4cbdf.appspot.com",
  messagingSenderId: "971541294007",
  appId: "1:971541294007:web:553b5e8b0354283582d632",
  measurementId: "G-TTCRVNL63Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadMusic(file, id) {
  const fileRef = ref(storage, id + ".png");

  await uploadBytes(fileRef, file);
  const fileURL = await getDownloadURL(fileRef);

  return fileURL;
}
