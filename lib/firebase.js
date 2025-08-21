// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgpXPLdkv3LFoam03FEpsITL5L6QTlFm4",
  authDomain: "stonehouse-group.firebaseapp.com",
  projectId: "stonehouse-group",
  storageBucket: "stonehouse-group.firebasestorage.app",
  messagingSenderId: "21702463207",
  appId: "1:21702463207:web:50263c04c0a32104f35c42",
  measurementId: "G-0SFJX0K0C0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
