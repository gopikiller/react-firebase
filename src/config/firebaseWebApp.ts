// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDbh-4RjmTvtvHkFPAoIdzTOe41kPklSbA",
    authDomain: "react-login-app-b2eee.firebaseapp.com",
    projectId: "react-login-app-b2eee",
    storageBucket: "react-login-app-b2eee.appspot.com",
    messagingSenderId: "808806225003",
    appId: "1:808806225003:web:b3352548ae1b9a99d1cd2e",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
