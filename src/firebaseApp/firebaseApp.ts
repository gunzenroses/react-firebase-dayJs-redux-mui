// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDMtrb8CV5MraiIBNOnZIFNGxgC3ptTJM8',
  authDomain: 'womanup-adcaf.firebaseapp.com',
  projectId: 'womanup-adcaf',
  storageBucket: 'womanup-adcaf.appspot.com',
  messagingSenderId: '357880339009',
  appId: '1:357880339009:web:37d075c19f3d2baa8c04c0',
  measurementId: 'G-KZJKJ5R14V',
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);

export { fireApp };
