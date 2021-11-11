// firebase library

import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

// here i want to import the seed database
// import { seedDatabase } from "../seed";

// connect to the database
const config = {
  apiKey: "AIzaSyBvXIohQm2RV0DTbvpBRNf84UmAeqX3fMg",
  authDomain: "instagram-3fd44.firebaseapp.com",
  projectId: "instagram-3fd44",
  storageBucket: "instagram-3fd44.appspot.com",
  messagingSenderId: "786746710429",
  appId: "1:786746710429:web:674ad3250b118125bd7774",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where i want to call the seed file (only once!)

// seedDatabase(firebase);

export { firebase, FieldValue };
